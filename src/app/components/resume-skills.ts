import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { type SkillCategory } from '../models/resume.model';

@Component({
  selector: 'app-resume-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'resume-block resume-skills' },
  template: `
    <section>
      <h2>{{ heading() }}</h2>
      @for (cat of categories(); track cat.label) {
        <p class="skill-line">
          <strong>{{ cat.label }}:</strong> {{ cat.skills }}
        </p>
      }
    </section>
  `,
  styleUrl: './resume-skills.scss',
})
export class ResumeSkills {
  heading = input.required<string>();
  categories = input.required<SkillCategory[]>();
}
