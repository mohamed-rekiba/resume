import { Injectable } from '@angular/core';
import * as jsYaml from 'js-yaml';
import {
  type Resume,
  type ResumeMetadata,
  type ResumeContact,
  type ResumeSection,
  type SectionType,
  type ExperienceEntry,
  type EducationEntry,
  type SkillCategory,
  type CertificationEntry,
} from '../models/resume.model';

@Injectable({ providedIn: 'root' })
export class MarkdownParserService {
  parseResume(raw: string): Resume {
    const { frontmatter, body } = this.splitFrontmatter(raw);
    const metadata = this.parseMetadata(frontmatter);
    const sections = this.parseSections(body);
    return { metadata, sections };
  }

  private splitFrontmatter(raw: string): { frontmatter: string; body: string } {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) {
      return { frontmatter: '', body: raw };
    }
    return { frontmatter: match[1], body: match[2] };
  }

  private parseMetadata(yaml: string): ResumeMetadata {
    if (!yaml.trim()) {
      return { name: '', title: '', contact: {} };
    }

    const data = jsYaml.load(yaml) as Record<string, unknown>;
    const contact = (data['contact'] ?? {}) as Record<string, string>;

    return {
      name: String(data['name'] ?? ''),
      title: String(data['title'] ?? ''),
      contact: {
        email: contact['email'] ?? undefined,
        phone: contact['phone'] ?? undefined,
        location: contact['location'] ?? undefined,
        linkedin: contact['linkedin'] ?? undefined,
        github: contact['github'] ?? undefined,
        website: contact['website'] ?? undefined,
      } satisfies ResumeContact,
    };
  }

  private parseSections(body: string): ResumeSection[] {
    const rawSections = body.split(/^## /m).filter((s) => s.trim());
    return rawSections.map((s) => this.parseSection(s));
  }

  private parseSection(raw: string): ResumeSection {
    const lines = raw.split('\n');
    const heading = lines[0].trim();
    const content = lines.slice(1).join('\n').trim();
    const type = this.detectSectionType(heading);

    switch (type) {
      case 'summary':
        return { type, heading, content };
      case 'experience':
        return { type, heading, entries: this.parseExperienceEntries(content) };
      case 'skills':
        return { type, heading, categories: this.parseSkillCategories(content) };
      case 'education':
        return { type, heading, entries: this.parseEducationEntries(content) };
      case 'certifications':
        return { type, heading, items: this.parseCertifications(content) };
      default:
        return { type: 'other', heading, content };
    }
  }

  private detectSectionType(heading: string): SectionType {
    const lower = heading.toLowerCase();

    if (
      lower.includes('summary') ||
      lower.includes('profile') ||
      lower.includes('objective') ||
      lower.includes('about')
    ) {
      return 'summary';
    }
    if (
      lower.includes('experience') ||
      lower.includes('employment') ||
      lower.includes('work history')
    ) {
      return 'experience';
    }
    if (
      lower.includes('skill') ||
      lower.includes('technical') ||
      lower.includes('competenc') ||
      lower.includes('technologies')
    ) {
      return 'skills';
    }
    if (lower.includes('education') || lower.includes('academic')) {
      return 'education';
    }
    if (
      lower.includes('certification') ||
      lower.includes('license') ||
      lower.includes('credential') ||
      lower.includes('open source') ||
      lower.includes('contribution') ||
      lower.includes('language') ||
      lower.includes('award') ||
      lower.includes('publication')
    ) {
      return 'certifications';
    }
    return 'other';
  }

  private parseExperienceEntries(content: string): ExperienceEntry[] {
    const entrySections = content.split(/^### /m).filter((s) => s.trim());

    return entrySections.map((section) => {
      const lines = section.split('\n');
      const titleLine = lines[0].trim();
      const titleParts = titleLine.split('|').map((s) => s.trim());
      const role = titleParts[0] ?? '';
      const company = titleParts[1] ?? '';

      let dateRange = '';
      let location = '';
      let bulletStartIdx = 1;

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const boldMatch = line.match(/^\*\*(.+?)\*\*(?:\s*\|\s*(.+))?$/);
        if (boldMatch) {
          dateRange = boldMatch[1].trim();
          location = boldMatch[2]?.trim() ?? '';
          bulletStartIdx = i + 1;
          break;
        }
      }

      const bullets = lines
        .slice(bulletStartIdx)
        .map((l) => l.trim())
        .filter((l) => l.startsWith('-') || l.startsWith('•'))
        .map((l) => l.replace(/^[-•]\s*/, ''));

      return { role, company, dateRange, location, bullets };
    });
  }

  private parseEducationEntries(content: string): EducationEntry[] {
    const entrySections = content.split(/^### /m).filter((s) => s.trim());

    return entrySections.map((section) => {
      const lines = section.split('\n');
      const titleLine = lines[0].trim();
      const titleParts = titleLine.split('|').map((s) => s.trim());
      const degree = titleParts[0] ?? '';
      const institution = titleParts[1] ?? '';

      let dateRange = '';
      let location = '';
      let detailStartIdx = 1;

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const boldMatch = line.match(/^\*\*(.+?)\*\*(?:\s*\|\s*(.+))?$/);
        if (boldMatch) {
          dateRange = boldMatch[1].trim();
          location = boldMatch[2]?.trim() ?? '';
          detailStartIdx = i + 1;
          break;
        }
      }

      const details = lines
        .slice(detailStartIdx)
        .map((l) => l.trim())
        .filter((l) => l.startsWith('-') || l.startsWith('•'))
        .map((l) => l.replace(/^[-•]\s*/, ''));

      return { degree, institution, dateRange, location, details };
    });
  }

  private parseSkillCategories(content: string): SkillCategory[] {
    return content
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.includes('**') && l.includes(':'))
      .map((line) => {
        const match = line.match(/\*\*(.+?):\*\*\s*(.+)/);
        if (!match) return null;
        return { label: match[1].trim(), skills: match[2].trim() };
      })
      .filter((c): c is SkillCategory => c !== null);
  }

  private parseCertifications(content: string): CertificationEntry[] {
    return content
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.startsWith('-') || l.startsWith('•'))
      .map((l) => {
        const text = l.replace(/^[-•]\s*/, '');
        const pipeIdx = text.indexOf('|');
        if (pipeIdx !== -1) {
          return {
            name: text.substring(0, pipeIdx).trim(),
            details: text.substring(pipeIdx + 1).trim(),
          };
        }
        return { name: text, details: '' };
      });
  }
}
