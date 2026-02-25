import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { type CertificationEntry } from '../models/resume.model';

@Component({
  selector: 'app-resume-certifications',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'resume-block resume-certifications' },
  template: `
    <section>
      <h2>{{ heading() }}</h2>
      <ul>
        @for (cert of items(); track cert.name) {
          <li>
            {{ cert.name }}
            @if (cert.details) {
              <span class="details"> — {{ cert.details }}</span>
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
