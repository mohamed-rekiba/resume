/**
 * Reads resume.md frontmatter and rewrites meta tags in src/index.html so they
 * stay in sync with the resume content without manual edits.
 *
 * Run automatically before every build via the `prebuild` npm script.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { load as yamlLoad } from 'js-yaml';

const ROOT = join(import.meta.dirname, '..');
const RESUME_MD = join(ROOT, 'public', 'resume', 'resume.md');
const INDEX_HTML = join(ROOT, 'src', 'index.html');

interface ResumeFrontmatter {
  name: string;
  title: string;
  contact: { email: string; linkedin?: string; github?: string; location?: string };
}

function parseFrontmatter(raw: string): ResumeFrontmatter {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error('Could not parse frontmatter from resume.md');
  return yamlLoad(match[1]) as ResumeFrontmatter;
}

function parseSummary(raw: string): string {
  const body = raw.replace(/^---[\s\S]*?---\r?\n/, '');
  const match = body.match(/^## Professional Summary\r?\n+([^\n#][^\n]*(?:\n(?!#)[^\n]*)*)/m);
  return match?.[1].replace(/\s+/g, ' ').trim() ?? '';
}

function parseSkillKeywords(raw: string): string[] {
  const skillsSection = raw.match(/## Skills\n+([\s\S]*?)(?=\n## |\s*$)/)?.[1] ?? '';
  // Strip category labels like **Cloud & Infrastructure:**
  const stripped = skillsSection.replace(/\*\*[^*]+\*\*:\s*/g, '');
  return stripped
    .split(/[\n,()[\]]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 2 && !/^\*/.test(s));
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

const raw = readFileSync(RESUME_MD, 'utf-8');
const fm = parseFrontmatter(raw);
const summary = parseSummary(raw);
const [firstName, ...rest] = fm.name.split(' ');
const lastName = rest.join(' ');
const fullTitle = `${fm.name} — ${fm.title}`;
const keywords = [...parseSkillKeywords(raw).slice(0, 10), fm.name].join(', ');

let html = readFileSync(INDEX_HTML, 'utf-8');

// <title>
html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(fullTitle)}</title>`);

// meta name="description"
html = html.replace(
  /(<meta\s+name="description"\s+content=")[^"]*(")/,
  `$1${escapeHtml(summary)}$2`,
);

// meta name="author"
html = html.replace(/(<meta\s+name="author"\s+content=")[^"]*(")/, `$1${escapeHtml(fm.name)}$2`);

// meta name="keywords"
html = html.replace(/(<meta\s+name="keywords"\s+content=")[^"]*(")/, `$1${escapeHtml(keywords)}$2`);

// og:title
html = html.replace(
  /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
  `$1${escapeHtml(fullTitle)}$2`,
);

// og:description
html = html.replace(
  /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
  `$1${escapeHtml(summary)}$2`,
);

// profile:first_name
html = html.replace(
  /(<meta\s+property="profile:first_name"\s+content=")[^"]*(")/,
  `$1${escapeHtml(firstName)}$2`,
);

// profile:last_name
html = html.replace(
  /(<meta\s+property="profile:last_name"\s+content=")[^"]*(")/,
  `$1${escapeHtml(lastName)}$2`,
);

// twitter:title
html = html.replace(
  /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
  `$1${escapeHtml(fullTitle)}$2`,
);

// twitter:description
html = html.replace(
  /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
  `$1${escapeHtml(summary)}$2`,
);

writeFileSync(INDEX_HTML, html, 'utf-8');
console.log(`✔ index.html meta tags updated from resume.md (${fm.name} — ${fm.title})`);
