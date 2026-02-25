import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { type ResumeMetadata } from '../models/resume.model';

@Component({
  selector: 'app-resume-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'resume-block resume-header' },
  template: `
    <header>
      <h1>{{ metadata().name }}</h1>
      <p class="title">{{ metadata().title }}</p>
      <p class="contact-line">{{ contactLine() }}</p>
    </header>
  `,
  styles: `
    :host {
      display: block;
      text-align: center;
      padding-bottom: 10px;
      border-bottom: 1.5px solid #222;
      margin-bottom: 6px;

      h1 {
        font-size: 22px;
        font-weight: 700;
        letter-spacing: 0.5px;
        margin-bottom: 2px;
        color: #111;
      }

      .title {
        font-size: 13px;
        color: #444;
        margin-bottom: 6px;
      }

      .contact-line {
        font-size: 11px;
        color: #555;
        word-spacing: 2px;
      }
    }
  `,
})
export class ResumeHeader {
  metadata = input.required<ResumeMetadata>();

  contactLine = computed(() => {
    const c = this.metadata().contact;
    const parts: string[] = [];
    if (c.email) parts.push(c.email);
    if (c.phone) parts.push(c.phone);
    if (c.location) parts.push(c.location);
    if (c.linkedin) parts.push(c.linkedin);
    if (c.github) parts.push(c.github);
    if (c.website) parts.push(c.website);
    return parts.join('  •  ');
  });
}
