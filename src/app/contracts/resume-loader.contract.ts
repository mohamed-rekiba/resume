/**
 * Contract for loading resume content with optional target override and section includes.
 * Implemented by ResumeLoaderService. Used by App to obtain a single Resume.
 */

import type { ResumeMetadata } from '../models/resume.model';

/** Valid target ID: alphanumeric and hyphen only. No path characters. */
export const TARGET_ID_PATTERN = /^[a-zA-Z0-9-]+$/;

/**
 * Result of loading base resume.md: frontmatter (YAML) and raw body (before include expansion).
 */
export interface BaseResumeContent {
  frontmatter: string;
  body: string;
}

/**
 * Result of loading a target override: partial metadata (merged over base).
 */
export type TargetOverrides = Partial<ResumeMetadata>;

/**
 * Loads base resume (resume.md) and optional target overrides.
 * - getTargetId(): returns current target ID from URL query or null.
 * - loadBase(): fetches resume/resume.md, returns frontmatter + body.
 * - loadTargetOverrides(id): fetches resume/targets/<id>.yaml, returns partial metadata or null.
 * - expandIncludes(body, basePath): replaces @include path with file contents under basePath; single-level only.
 */
export interface IResumeLoader {
  getTargetId(): string | null;
  loadBase(): Promise<BaseResumeContent>;
  loadTargetOverrides(id: string): Promise<TargetOverrides | null>;
  expandIncludes(body: string, basePath: string): Promise<string>;
}

/** Base path for resume assets (no leading/trailing slash). */
export const RESUME_BASE_PATH = 'resume';
