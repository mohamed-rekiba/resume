import { test, expect } from '@playwright/test';
import { writeFileSync, readFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { load as yamlLoad } from 'js-yaml';

const PDF_OUTPUT_DIR = join(__dirname, '..', 'e2e-results');
const PDF_OUTPUT_PATH = join(PDF_OUTPUT_DIR, 'resume.pdf');
const RESUME_MD_PATH = join(__dirname, '..', 'public', 'resume', 'resume.md');

interface ResumeFrontmatter {
  name: string;
  title: string;
  contact: { email: string; linkedin: string; github: string };
}

function parseResumeMd(): ResumeFrontmatter {
  const raw = readFileSync(RESUME_MD_PATH, 'utf-8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error('Could not parse frontmatter from resume.md');
  return yamlLoad(match[1]) as ResumeFrontmatter;
}

function extractCompanies(mdBody: string): string[] {
  const matches = mdBody.matchAll(/^### .+\| (.+)$/gm);
  return [...matches].map((m) => m[1].trim());
}

async function extractPdf(path: string): Promise<{ text: string; numpages: number }> {
  const { PDFParse } = await import('pdf-parse');
  const buf = readFileSync(path);
  const parser = new PDFParse(new Uint8Array(buf));
  const result = await parser.getText();
  return { text: result.text, numpages: result.total };
}

test.describe('ATS Resume Validation', () => {
  let pdfText: string;
  let pageCount: number;
  let frontmatter: ResumeFrontmatter;
  let companies: string[];

  test.beforeAll(async ({ browser }) => {
    const raw = readFileSync(RESUME_MD_PATH, 'utf-8');
    const bodyMatch = raw.match(/^---[\s\S]*?---\r?\n([\s\S]*)$/);
    const body = bodyMatch?.[1] ?? '';

    frontmatter = parseResumeMd();
    companies = extractCompanies(body);

    const page = await browser.newPage();
    await page.goto('/');
    await page.waitForSelector('.resume-page-wrapper', { timeout: 15_000 });

    const pdfBuffer = await page.pdf({
      preferCSSPageSize: true,
      printBackground: false,
    });

    mkdirSync(PDF_OUTPUT_DIR, { recursive: true });
    writeFileSync(PDF_OUTPUT_PATH, pdfBuffer);

    const data = await extractPdf(PDF_OUTPUT_PATH);
    pdfText = data.text;
    pageCount = data.numpages;
    await page.close();
  });

  test('PDF is text-based and extractable', () => {
    expect(pdfText.length).toBeGreaterThan(200);
  });

  test('page count is between 1 and 3', () => {
    expect(pageCount).toBeGreaterThanOrEqual(1);
    expect(pageCount).toBeLessThanOrEqual(3);
  });

  test('contact information is parseable', () => {
    expect(pdfText).toContain(frontmatter.name);
    expect(pdfText).toContain(frontmatter.contact.email);
    expect(pdfText).toMatch(/linkedin/i);
    expect(pdfText).toMatch(/github/i);
  });

  test('standard ATS section headings are present', () => {
    const requiredSections = [/Professional Summary/i, /Work Experience/i, /Skills/i, /Education/i];

    for (const section of requiredSections) {
      expect(pdfText).toMatch(section);
    }
  });

  test('date patterns are extractable by ATS parsers', () => {
    expect(pdfText).toMatch(/\d{4}/);
    expect(pdfText).toMatch(/Present/i);
  });

  test('no garbled or encoded text artifacts', () => {
    expect(pdfText).not.toMatch(/\P{ASCII}{10,}/u);
    expect(pdfText).not.toContain('undefined');
    expect(pdfText).not.toContain('[object Object]');
  });

  test('work experience entries include company names', () => {
    for (const company of companies) {
      expect(pdfText).toContain(company);
    }
  });

  test('skills section contains key technical terms', () => {
    const coreKeywords = ['AWS', 'Kubernetes', 'Terraform', 'Docker'];
    for (const keyword of coreKeywords) {
      expect(pdfText).toContain(keyword);
    }
  });
});
