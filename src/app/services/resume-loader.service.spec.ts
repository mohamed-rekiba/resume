import { ResumeLoaderService } from './resume-loader.service';
import type { ResumeMetadata } from '../models/resume.model';

describe('ResumeLoaderService', () => {
  let service: ResumeLoaderService;

  beforeEach(() => {
    service = new ResumeLoaderService();
  });

  describe('getTargetId', () => {
    it('returns null when window is undefined', () => {
      expect(service.getTargetId()).toBeNull();
    });
  });

  describe('mergeMetadata', () => {
    const base: ResumeMetadata = {
      name: 'Jane Doe',
      title: 'Engineer',
      contact: {
        email: 'jane@example.com',
        location: 'NYC',
        linkedin: 'linkedin.com/in/jane',
      },
    };

    it('returns base when overrides are empty', () => {
      const merged = service.mergeMetadata(base, {});
      expect(merged).toEqual(base);
    });

    it('overrides only defined fields', () => {
      const merged = service.mergeMetadata(base, {
        title: 'Senior Engineer',
        contact: { location: 'SF' },
      });
      expect(merged.name).toBe('Jane Doe');
      expect(merged.title).toBe('Senior Engineer');
      expect(merged.contact?.email).toBe('jane@example.com');
      expect(merged.contact?.location).toBe('SF');
      expect(merged.contact?.linkedin).toBe('linkedin.com/in/jane');
    });

    it('preserves base contact when overrides omit contact', () => {
      const merged = service.mergeMetadata(base, { title: 'Lead' });
      expect(merged.contact?.email).toBe('jane@example.com');
      expect(merged.contact?.location).toBe('NYC');
    });
  });
});
