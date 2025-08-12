import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { ContentService, Experience } from './content.service';

describe('ContentService', () => {
    let service: ContentService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClientTesting(), ContentService]
        });
        service = TestBed.inject(ContentService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('loadSummary', () => {
        it('should load and parse summary markdown', () => {
            const testMarkdown = 'This is a **test** summary';
            const expectedHtml = '<p>This is a <strong>test</strong> summary</p>\n';

            service.loadSummary().subscribe(html => {
                expect(html).toBe(expectedHtml);
            });

            const req = httpMock.expectOne('assets/content/summary.md');
            expect(req.request.method).toBe('GET');
            req.flush(testMarkdown);
        });

        it('should handle errors gracefully', () => {
            service.loadSummary().subscribe(html => {
                expect(html).toBe('');
            });

            const req = httpMock.expectOne('assets/content/summary.md');
            req.error(new ProgressEvent('Network error'));
        });
    });

    describe('loadExperiences', () => {
        it('should load all experience files', () => {
            const testMarkdown = `---
title: "Test Title"
company: "Test Company"
period: "2020 - 2023"
---

# Test Header
**Bold text** and *italic text*

- List item 1
- List item 2`;

            const expectedExperience: Experience = {
                title: 'Test Title',
                company: 'Test Company',
                period: '2020 - 2023',
                content: expect.any(String)
            };

            service.loadExperiences().subscribe(experiences => {
                expect(experiences).toEqual([expectedExperience, expectedExperience, expectedExperience, expectedExperience, expectedExperience, expectedExperience]);
            });

            // Expect 6 requests (one for each experience file)
            const requests = httpMock.match('assets/content/experiences/');
            expect(requests.length).toBe(6);

            requests.forEach(req => {
                req.flush(testMarkdown);
            });
        });

        it('should handle individual file errors gracefully', () => {
            const testMarkdown = `---
title: "Test Title"
company: "Test Company"
period: "2020 - 2023"
---

# Test Content
Some content here`;

            service.loadExperiences().subscribe(experiences => {
                // Should still return experiences from successful requests
                expect(experiences.length).toBeGreaterThan(0);
            });

            const requests = httpMock.match('assets/content/experiences/');

            // Make first request fail, others succeed
            requests[0].error(new ErrorEvent('Network error'));
            requests.slice(1).forEach(req => {
                req.flush(testMarkdown);
            });
        });
    });

    describe('parseExperienceMarkdown', () => {
        it('should parse valid markdown with front matter and full content', () => {
            const testMarkdown = `---
title: "Software Engineer"
company: "Test Corp"
period: "2020 - 2023"
---

# INFRASTRUCTURE & DEVOPS ENGINEER

## TECHNICAL SKILLS
**Cloud:** Amazon Web Services (AWS), AWS EC2, AWS ECS
**DevOps:** Terraform, Ansible, CI/CD

## PROFESSIONAL EXPERIENCE
* **Architected** complete cloud migration
* **Engineered** hybrid multi-cloud solution`;

            const result = (service as any).parseExperienceMarkdown(testMarkdown);

            expect(result).toEqual({
                title: 'Software Engineer',
                company: 'Test Corp',
                period: '2020 - 2023',
                content: expect.stringContaining('<h1>INFRASTRUCTURE & DEVOPS ENGINEER</h1>')
            });
        });

        it('should handle missing front matter gracefully', () => {
            const testMarkdown = `# Test Header
Some content here`;

            const result = (service as any).parseExperienceMarkdown(testMarkdown);

            expect(result).toEqual({
                title: '',
                company: '',
                period: '',
                content: expect.stringContaining('<h1>Test Header</h1>')
            });
        });
    });
});
