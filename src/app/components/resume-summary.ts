import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-resume-summary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'resume-block resume-summary' },
  template: `
    <section>
      <h2>{{ heading() }}</h2>
      <p>{{ content() }}</p>
    </section>
  `,
  styleUrl: './resume-summary.scss',
})
export class ResumeSummary {
  heading = input.required<string>();
  content = input.required<string>();
}
