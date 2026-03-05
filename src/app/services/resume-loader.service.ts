import { Injectable } from '@angular/core';
import * as jsYaml from 'js-yaml';
import type { ResumeMetadata, ResumeContact } from '../models/resume.model';
import {
  type BaseResumeContent,
  type TargetOverrides,
  TARGET_ID_PATTERN,
  RESUME_BASE_PATH,
} from '../contracts/resume-loader.contract';

@Injectable({ providedIn: 'root' })
export class ResumeLoaderService {
  getTargetId(): string | null {
    if (typeof window === 'undefined' || !window.location?.search) return null;
    const params = new URLSearchParams(window.location.search);
    const target = params.get('target');
    if (target === null || target === '') return null;
    return TARGET_ID_PATTERN.test(target) ? target : null;
  }

  async loadBase(): Promise<BaseResumeContent> {
    const url = `${RESUME_BASE_PATH}/resume.md`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load resume (HTTP ${response.status})`);
    }
    const raw = await response.text();
    return this.splitFrontmatter(raw);
  }

  private splitFrontmatter(raw: string): BaseResumeContent {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) {
      return { frontmatter: '', body: raw };
    }
    return { frontmatter: match[1], body: match[2] };
  }

  async loadTargetOverrides(id: string): Promise<TargetOverrides | null> {
    if (!TARGET_ID_PATTERN.test(id)) return null;
    const url = `${RESUME_BASE_PATH}/targets/${encodeURIComponent(id)}.yaml`;
    const response = await fetch(url);
    if (!response.ok) return null;
    const raw = await response.text();
    try {
      const data = jsYaml.load(raw) as Record<string, unknown>;
      return this.normalizeTargetOverrides(data);
    } catch {
      return null;
    }
  }

  private normalizeTargetOverrides(data: Record<string, unknown>): TargetOverrides {
    const contact = (data['contact'] ?? {}) as Record<string, string>;
    return {
      name: data['name'] != null ? String(data['name']) : undefined,
      title: data['title'] != null ? String(data['title']) : undefined,
      contact: {
        email: contact['email'],
        phone: contact['phone'],
        location: contact['location'],
        linkedin: contact['linkedin'],
        github: contact['github'],
        website: contact['website'],
      },
    };
  }

  /**
   * Expands @include path lines in body. Path must be under basePath (no .. or absolute).
   * Single-level only: content of included files is not scanned for further @include.
   */
  async expandIncludes(body: string, basePath: string): Promise<string> {
    const lines = body.split(/\r?\n/);
    const result: string[] = [];

    for (const line of lines) {
      const match = line.match(/^@include\s+(.+)$/);
      if (!match) {
        result.push(line);
        continue;
      }
      const path = match[1].trim();
      const expanded = await this.fetchInclude(path, basePath);
      result.push(expanded ?? line);
    }

    return result.join('\n');
  }

  private async fetchInclude(path: string, basePath: string): Promise<string | null> {
    const normalized = this.safeIncludePath(path, basePath);
    if (normalized === null) return null;
    const url = `${RESUME_BASE_PATH}/${normalized}`;
    const response = await fetch(url);
    if (!response.ok) return null;
    return response.text();
  }

  /**
   * Returns path if it is safe (no .., no leading /); otherwise null.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- basePath reserved for future path scoping
  private safeIncludePath(path: string, _basePath: string): string | null {
    const trimmed = path.trim();
    if (trimmed.startsWith('/') || trimmed.includes('..')) return null;
    const parts = trimmed.split(/[/\\]/).filter(Boolean);
    for (const p of parts) {
      if (p === '..') return null;
    }
    return trimmed;
  }

  /**
   * Merges target overrides over base metadata. Contact is deep-merged.
   */
  mergeMetadata(base: ResumeMetadata, overrides: TargetOverrides): ResumeMetadata {
    return {
      name: overrides.name ?? base.name,
      title: overrides.title ?? base.title,
      contact: this.mergeContact(base.contact, overrides.contact ?? {}),
    };
  }

  private mergeContact(base: ResumeContact, overrides: Partial<ResumeContact>): ResumeContact {
    return {
      email: overrides.email ?? base.email,
      phone: overrides.phone ?? base.phone,
      location: overrides.location ?? base.location,
      linkedin: overrides.linkedin ?? base.linkedin,
      github: overrides.github ?? base.github,
      website: overrides.website ?? base.website,
    };
  }
}
