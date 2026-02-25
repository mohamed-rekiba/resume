# Mohamed Rekiba -- Resume

[![CI](https://github.com/mohamed-rekiba/resume/actions/workflows/ci.yml/badge.svg)](https://github.com/mohamed-rekiba/resume/actions/workflows/ci.yml)
[![ATS Validated](https://img.shields.io/badge/ATS-Validated-brightgreen)](#ats-compatibility)
[![Deploy](https://github.com/mohamed-rekiba/resume/actions/workflows/release.yml/badge.svg)](https://github.com/mohamed-rekiba/resume/actions/workflows/release.yml)

**Live:** [mohamed-rekiba.github.io/resume](https://mohamed-rekiba.github.io/resume)
**PDF:** Download from the [latest release](https://github.com/mohamed-rekiba/resume/releases/latest)

---

An Angular application that renders my resume from Markdown into a live paginated A4 preview and exports ATS-friendly text-based PDFs. Every change is automatically tested for ATS compatibility, security-scanned, and deployed to GitHub Pages.

## Why This Exists

Most resume builders produce image-heavy PDFs that ATS (Applicant Tracking Systems) can't parse. This project treats the resume as **data** (Markdown + YAML) and renders it with **semantic HTML**, ensuring every word is machine-readable while looking clean in print.

The CI pipeline validates ATS compatibility on every commit by generating a real PDF, extracting its text, and asserting that section headings, dates, skills, and contact info are all parseable.

## How It Works

```
resume.md (Markdown + YAML)
    │
    ▼
Markdown Parser ──► Resume Model ──► Angular Components
                                          │
                                    Page Break Algorithm
                                          │
                                    ┌─────┴─────┐
                                    │  A4 Pages  │
                                    └─────┬─────┘
                                          │
                              ┌───────────┼───────────┐
                              ▼           ▼           ▼
                          Live Preview   PDF Export   ATS Validation (CI)
```

1. **Write** your resume in [`public/resume/resume.md`](public/resume/resume.md) using Markdown with YAML frontmatter
2. **Preview** the live paginated A4 layout at `localhost:4200`
3. **Export** to PDF via `Ctrl+P` / `Cmd+P` or the Export button

## Quick Start

```bash
npm install
npx ng serve
```

Open [localhost:4200](http://localhost:4200) to see the live preview.

## Resume Format

```yaml
---
name: Your Name
title: Your Job Title
contact:
  email: you@example.com
  phone: "+1 (555) 123-4567"
  location: "City, Country"
  linkedin: linkedin.com/in/yourprofile
  github: github.com/yourusername
---

## Professional Summary

Your summary paragraph here.

## Work Experience

### Job Title | Company Name
**Jan 2023 - Present** | City, Country

- Achievement with measurable impact
- Another bullet point

## Skills

**Category:** Tool1, Tool2, Tool3

## Education

### Degree | University
**City, Country**
```

### Supported Sections

| Section | Detected By | Format |
|---|---|---|
| Summary | "summary", "profile", "objective" | Paragraph |
| Experience | "experience", "employment", "work" | `### Role \| Company` with dates and bullets |
| Skills | "skill", "technical", "technologies" | `**Label:** comma-separated` |
| Education | "education", "academic" | `### Degree \| Institution` |
| Certifications | "certification", "open source", "language" | Bullet list |

## ATS Compatibility

Every commit is validated against these checks:

- **Text extractable** -- PDF is text-based, not image-based
- **Contact info parseable** -- Name, email, LinkedIn, GitHub
- **Standard section headings** -- "Work Experience", "Skills", "Education"
- **Date patterns** -- `Jan 2023 - Present` format recognized by parsers
- **Company names** -- All employers present and extractable
- **Technical keywords** -- Skills section contains searchable terms
- **No encoding artifacts** -- Clean text without garbled characters
- **Page count** -- 1-3 pages (ATS-friendly length)

## CI/CD Pipeline

```
Push / PR                             Push to main
    │                                      │
    ▼                                      ▼
┌────────────┐  ┌───────────────┐   ┌──────────────┐
│ Unit Tests │  │ Security Scan │   │Release Please│
│   + Build  │  │  npm audit    │   │  changelog   │
│            │  │  gitleaks     │   │ version bump │
└─────┬──────┘  └───────────────┘   └──────┬───────┘
      │                                    │
      ▼                                    ▼ (on release merge)
┌──────────────┐  ┌──────────┐      ┌────────────┐
│ATS Validation│  │  CodeQL  │      │  Deploy to  │
│  Playwright  │  │ Analysis │      │GitHub Pages │
│  PDF export  │  │          │      │+ attach PDF │
└──────────────┘  └──────────┘      └────────────┘
```

| Workflow | Trigger | What it does |
|---|---|---|
| **CI** | Push & PR | Unit tests, build, security scan, ATS validation |
| **CodeQL** | Push, PR & weekly | Static analysis for security vulnerabilities |
| **Release** | Push to main | Release Please PR + GitHub Pages deploy on release |
| **Dependabot** | Weekly | Dependency update PRs for npm and GitHub Actions |

## Project Structure

```
src/
  app/
    models/
      resume.model.ts              # TypeScript interfaces + block builder
    services/
      markdown-parser.service.ts   # YAML frontmatter + Markdown parser
      page-break.service.ts        # A4 pagination algorithm
      pdf-export.service.ts        # Browser print trigger
    components/
      resume-header.ts             # Name, title, contact info
      resume-summary.ts            # Professional summary
      resume-experience.ts         # Work experience entry
      resume-skills.ts             # Skills categories
      resume-education.ts          # Education entry
      resume-certifications.ts     # Certifications / open source list
      resume-page.ts               # A4 page wrapper with page numbers
      resume-preview.ts            # Pagination orchestrator
      resume-toolbar.ts            # Top bar with export + page count
    app.ts                         # Root component
  styles/
    _variables.scss                # Design tokens (colors, typography)
    _section-heading.scss          # Shared section heading mixin
    _entry-layout.scss             # Shared entry layout mixin
  styles.scss                      # Global styles + @media print
e2e/
  ats-validation.spec.ts           # ATS compatibility test suite
public/
  resume/
    resume.md                      # Resume data (edit this!)
```

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 21 (standalone components, signals, OnPush) |
| Parsing | js-yaml (frontmatter), custom Markdown parser |
| Testing | Vitest (unit), Playwright (e2e + PDF) |
| CI/CD | GitHub Actions, Release Please, Dependabot |
| Security | CodeQL, npm audit, Gitleaks |
| Hosting | GitHub Pages |
| PDF | Browser-native `window.print()` -- zero dependencies |

## Scripts

```bash
npx ng serve               # Dev server at localhost:4200
npx ng build                # Production build
npx ng test                 # Unit tests (Vitest)
npx playwright test         # ATS validation (exports PDF)
```

## License

MIT
