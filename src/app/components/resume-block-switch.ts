import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { type ResumeBlock } from '../models/resume.model';
import { ResumeHeader } from './resume-header';
import { ResumeSummary } from './resume-summary';
import { ResumeExperience } from './resume-experience';
import { ResumeSkills } from './resume-skills';
import { ResumeEducation } from './resume-education';
import { ResumeCertifications } from './resume-certifications';

@Component({
  selector: 'app-resume-block-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ResumeHeader,
    ResumeSummary,
    ResumeExperience,
    ResumeSkills,
    ResumeEducation,
    ResumeCertifications,
  ],
  template: `
    @switch (block().type) {
      @case ('header') {
        <app-resume-header [metadata]="$any(block()).metadata" />
      }
      @case ('summary') {
        <app-resume-summary [heading]="$any(block()).heading" [content]="$any(block()).content" />
      }
      @case ('experience') {
        <app-resume-experience [heading]="$any(block()).heading" [entry]="$any(block()).entry" />
      }
      @case ('skills') {
        <app-resume-skills
          [heading]="$any(block()).heading"
          [categories]="$any(block()).categories"
        />
      }
      @case ('education') {
        <app-resume-education [heading]="$any(block()).heading" [entry]="$any(block()).entry" />
      }
      @case ('certifications') {
        <app-resume-certifications
          [heading]="$any(block()).heading"
          [items]="$any(block()).items"
        />
      }
      @case ('other') {
        <section class="resume-block resume-other">
          <h2>{{ $any(block()).heading }}</h2>
          <p>{{ $any(block()).content }}</p>
        </section>
      }
    }
  `,
})
export class ResumeBlockSwitch {
  block = input.required<ResumeBlock>();
}
