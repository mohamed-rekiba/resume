import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { type CertificationEntry } from '../models/resume.model';
import { MarkdownInlinePipe } from '../pipes/markdown-inline.pipe';

@Component({
  selector: 'app-resume-certifications',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MarkdownInlinePipe],
  host: { class: 'resume-block resume-certifications' },
  template: `
    <section>
      <h2>{{ heading() }}</h2>
      <ul>
        @for (cert of items(); track cert.name) {
          <li>
            <span [innerHTML]="cert.name | markdownInline"></span>
            @if (cert.details) {
              <span class="details">
                — <span [innerHTML]="cert.details | markdownInline"></span
              ></span>
            }
          </li>
        }
      </ul>
    </section>
  `,
  styleUrl: './resume-certifications.scss',
})
export class ResumeCertifications {
  heading = input.required<string>();
  items = input.required<CertificationEntry[]>();
}
