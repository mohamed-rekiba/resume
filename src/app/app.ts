import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { type Resume } from './models/resume.model';
import { MarkdownParserService } from './services/markdown-parser.service';
import { ResumePreview } from './components/resume-preview';
import { ResumeToolbar } from './components/resume-toolbar';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ResumePreview, ResumeToolbar],
  template: `
    @if (error()) {
      <div class="error-banner" role="alert">
        <p>{{ error() }}</p>
      </div>
    } @else if (resume()) {
      <app-resume-toolbar [totalPages]="totalPages()" [name]="resume()!.metadata.name" />
      <main>
        <app-resume-preview [resume]="resume()!" (pagesChanged)="totalPages.set($event)" />
      </main>
    } @else {
      <div class="loading" role="status">
        <p>Loading resume...</p>
      </div>
    }
  `,
  styles: `
    .error-banner {
      max-width: 600px;
      margin: 48px auto;
      padding: 24px;
      background: #fee;
      border: 1px solid #c00;
      border-radius: 8px;
      color: #900;
      text-align: center;
      font-size: 16px;
    }
    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      font-size: 18px;
      color: #666;
    }
  `,
})
export class App implements OnInit {
  resume = signal<Resume | null>(null);
  error = signal<string>('');
  totalPages = signal(0);

  private parser = inject(MarkdownParserService);

  async ngOnInit(): Promise<void> {
    try {
      const response = await fetch('resume/resume.md');
      if (!response.ok) {
        this.error.set(`Failed to load resume.md (HTTP ${response.status})`);
        return;
      }
      const raw = await response.text();
      const parsed = this.parser.parseResume(raw);
      this.resume.set(parsed);
    } catch {
      this.error.set('Failed to load resume. Make sure public/resume/resume.md exists.');
    }
  }
}
