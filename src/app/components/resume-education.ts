import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { type EducationEntry } from '../models/resume.model';

@Component({
  selector: 'app-resume-education',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'resume-block resume-education' },
  template: `
    <section>
      @if (heading()) {
        <h2>{{ heading() }}</h2>
      }
      <div class="entry">
        <div class="entry-header">
          <h3>{{ entry().degree }} <span class="separator">|</span> {{ entry().institution }}</h3>
          <span class="date">{{ entry().dateRange }}</span>
        </div>
        @if (entry().location) {
          <p class="location">{{ entry().location }}</p>
        }
        @if (entry().details.length > 0) {
          <ul>
            @for (detail of entry().details; track $index) {
              <li>{{ detail }}</li>
            }
          </ul>
        }
      </div>
    </section>
  `,
  styleUrl: './resume-education.scss',
})
export class ResumeEducation {
  heading = input<string | undefined>();
  entry = input.required<EducationEntry>();
}
