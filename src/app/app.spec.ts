import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { MarkdownParserService } from './services/markdown-parser.service';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should start with null resume and no error', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.resume()).toBeNull();
    expect(app.error()).toBe('');
  });
});

describe('MarkdownParserService', () => {
  let parser: MarkdownParserService;

  beforeEach(() => {
    parser = new MarkdownParserService();
  });

  it('should parse YAML frontmatter into metadata', () => {
    const raw = `---
name: John Doe
title: Software Engineer
contact:
  email: john@example.com
  location: NYC
---

## Professional Summary

A short summary.
`;

    const resume = parser.parseResume(raw);
    expect(resume.metadata.name).toBe('John Doe');
    expect(resume.metadata.title).toBe('Software Engineer');
    expect(resume.metadata.contact.email).toBe('john@example.com');
    expect(resume.metadata.contact.location).toBe('NYC');
  });

  it('should detect section types by heading keywords', () => {
    const raw = `---
name: Test
title: Test
contact: {}
---

## Professional Summary

Summary text here.

## Work Experience

### Engineer | Company
**2020 - 2023** | City

- Did stuff

## Skills

**Languages:** Go, Python

## Education

### BS Computer Science | MIT
**2016 - 2020** | Cambridge

## Certifications

- AWS Cert
`;

    const resume = parser.parseResume(raw);
    expect(resume.sections.length).toBe(5);
    expect(resume.sections[0].type).toBe('summary');
    expect(resume.sections[1].type).toBe('experience');
    expect(resume.sections[2].type).toBe('skills');
    expect(resume.sections[3].type).toBe('education');
    expect(resume.sections[4].type).toBe('certifications');
  });

  it('should parse experience entries with role, company, date, location, and bullets', () => {
    const raw = `---
name: Test
title: Test
contact: {}
---

## Work Experience

### Senior Dev | Acme Corp
**Jan 2021 - Present** | San Francisco

- Built APIs
- Led team of 5
`;

    const resume = parser.parseResume(raw);
    const section = resume.sections[0];
    expect(section.type).toBe('experience');
    if (section.type === 'experience') {
      expect(section.entries.length).toBe(1);
      expect(section.entries[0].role).toBe('Senior Dev');
      expect(section.entries[0].company).toBe('Acme Corp');
      expect(section.entries[0].dateRange).toBe('Jan 2021 - Present');
      expect(section.entries[0].location).toBe('San Francisco');
      expect(section.entries[0].bullets).toEqual(['Built APIs', 'Led team of 5']);
    }
  });

  it('should parse skill categories', () => {
    const raw = `---
name: Test
title: Test
contact: {}
---

## Skills

**Languages:** Go, Python, TypeScript
**Frameworks:** Angular, React
`;

    const resume = parser.parseResume(raw);
    const section = resume.sections[0];
    expect(section.type).toBe('skills');
    if (section.type === 'skills') {
      expect(section.categories.length).toBe(2);
      expect(section.categories[0].label).toBe('Languages');
      expect(section.categories[0].skills).toBe('Go, Python, TypeScript');
      expect(section.categories[1].label).toBe('Frameworks');
      expect(section.categories[1].skills).toBe('Angular, React');
    }
  });

  it('should parse education entries', () => {
    const raw = `---
name: Test
title: Test
contact: {}
---

## Education

### MSc Computer Science | Stanford
**2018 - 2020** | Stanford, CA

- Research in distributed systems
`;

    const resume = parser.parseResume(raw);
    const section = resume.sections[0];
    expect(section.type).toBe('education');
    if (section.type === 'education') {
      expect(section.entries.length).toBe(1);
      expect(section.entries[0].degree).toBe('MSc Computer Science');
      expect(section.entries[0].institution).toBe('Stanford');
      expect(section.entries[0].dateRange).toBe('2018 - 2020');
      expect(section.entries[0].location).toBe('Stanford, CA');
      expect(section.entries[0].details).toEqual(['Research in distributed systems']);
    }
  });

  it('should parse certifications', () => {
    const raw = `---
name: Test
title: Test
contact: {}
---

## Certifications

- AWS Solutions Architect
- CKA
`;

    const resume = parser.parseResume(raw);
    const section = resume.sections[0];
    expect(section.type).toBe('certifications');
    if (section.type === 'certifications') {
      expect(section.items.length).toBe(2);
      expect(section.items[0].name).toBe('AWS Solutions Architect');
      expect(section.items[1].name).toBe('CKA');
    }
  });

  it('should handle missing frontmatter gracefully', () => {
    const raw = `## Summary

Just a summary with no frontmatter.
`;

    const resume = parser.parseResume(raw);
    expect(resume.metadata.name).toBe('');
    expect(resume.metadata.title).toBe('');
    expect(resume.sections.length).toBe(1);
  });
});
