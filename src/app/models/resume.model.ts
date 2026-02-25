export interface ResumeContact {
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface ResumeMetadata {
  name: string;
  title: string;
  contact: ResumeContact;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  dateRange: string;
  location: string;
  bullets: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  dateRange: string;
  location: string;
  details: string[];
}

export interface SkillCategory {
  label: string;
  skills: string;
}

export interface CertificationEntry {
  name: string;
  details: string;
}

export interface SummarySection {
  type: 'summary';
  heading: string;
  content: string;
}

export interface ExperienceSection {
  type: 'experience';
  heading: string;
  entries: ExperienceEntry[];
}

export interface SkillsSection {
  type: 'skills';
  heading: string;
  categories: SkillCategory[];
}

export interface EducationSection {
  type: 'education';
  heading: string;
  entries: EducationEntry[];
}

export interface CertificationsSection {
  type: 'certifications';
  heading: string;
  items: CertificationEntry[];
}

export interface OtherSection {
  type: 'other';
  heading: string;
  content: string;
}

export type ResumeSection =
  | SummarySection
  | ExperienceSection
  | SkillsSection
  | EducationSection
  | CertificationsSection
  | OtherSection;

export type SectionType = ResumeSection['type'];

export interface Resume {
  metadata: ResumeMetadata;
  sections: ResumeSection[];
}

// Renderable blocks for pagination

export interface HeaderBlock {
  id: string;
  type: 'header';
  metadata: ResumeMetadata;
}

export interface SummaryBlock {
  id: string;
  type: 'summary';
  heading: string;
  content: string;
}

export interface ExperienceBlock {
  id: string;
  type: 'experience';
  heading?: string;
  entry: ExperienceEntry;
}

export interface SkillsBlock {
  id: string;
  type: 'skills';
  heading: string;
  categories: SkillCategory[];
}

export interface EducationBlock {
  id: string;
  type: 'education';
  heading?: string;
  entry: EducationEntry;
}

export interface CertificationsBlock {
  id: string;
  type: 'certifications';
  heading: string;
  items: CertificationEntry[];
}

export interface OtherBlock {
  id: string;
  type: 'other';
  heading: string;
  content: string;
}

export type ResumeBlock =
  | HeaderBlock
  | SummaryBlock
  | ExperienceBlock
  | SkillsBlock
  | EducationBlock
  | CertificationsBlock
  | OtherBlock;

/**
 * Converts a parsed Resume into a flat list of renderable blocks.
 * Section heading is merged with the first entry to prevent orphan headings.
 */
export function buildBlocks(resume: Resume): ResumeBlock[] {
  const blocks: ResumeBlock[] = [];
  let idx = 0;

  blocks.push({ id: `block-${idx++}`, type: 'header', metadata: resume.metadata });

  for (const section of resume.sections) {
    switch (section.type) {
      case 'summary':
        blocks.push({
          id: `block-${idx++}`,
          type: 'summary',
          heading: section.heading,
          content: section.content,
        });
        break;

      case 'experience':
        for (let i = 0; i < section.entries.length; i++) {
          blocks.push({
            id: `block-${idx++}`,
            type: 'experience',
            heading: i === 0 ? section.heading : undefined,
            entry: section.entries[i],
          });
        }
        break;

      case 'skills':
        blocks.push({
          id: `block-${idx++}`,
          type: 'skills',
          heading: section.heading,
          categories: section.categories,
        });
        break;

      case 'education':
        for (let i = 0; i < section.entries.length; i++) {
          blocks.push({
            id: `block-${idx++}`,
            type: 'education',
            heading: i === 0 ? section.heading : undefined,
            entry: section.entries[i],
          });
        }
        break;

      case 'certifications':
        blocks.push({
          id: `block-${idx++}`,
          type: 'certifications',
          heading: section.heading,
          items: section.items,
        });
        break;

      case 'other':
        blocks.push({
          id: `block-${idx++}`,
          type: 'other',
          heading: section.heading,
          content: section.content,
        });
        break;
    }
  }

  return blocks;
}
