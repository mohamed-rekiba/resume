import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { type ExperienceEntry } from '../models/resume.model';
import { MarkdownInlinePipe } from '../pipes/markdown-inline.pipe';

@Component({
  selector: 'app-resume-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MarkdownInlinePipe],
  host: { class: 'resume-block resume-experience' },
  template: `
    <section>
      @if (heading()) {
        <h2>{{ heading() }}</h2>
      }
      <div class="entry">
        <div class="entry-header">
          <h3>{{ entry().role }} <span class="separator">|</span> {{ entry().company }}</h3>
          <span class="date">{{ entry().dateRange }}</span>
        </div>
        @if (entry().location) {
          <p class="location">{{ entry().location }}</p>
        }
        @if (entry().bullets.length > 0) {
          <ul>
            @for (bullet of entry().bullets; track $index) {
              <li [innerHTML]="bullet | markdownInline"></li>
            }
          </ul>
        }
      </div>
    </section>
  `,
  styleUrl: './resume-experience.scss',
})
export class ResumeExperience {
  heading = input<string | undefined>();
  entry = input.required<ExperienceEntry>();
}
