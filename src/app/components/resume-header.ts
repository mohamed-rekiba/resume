import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { type ResumeMetadata, type ResumeContact } from '../models/resume.model';

interface ContactItem {
  label: string;
  href?: string;
}

@Component({
  selector: 'app-resume-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'resume-block resume-header' },
  template: `
    <header>
      <h1>{{ metadata().name }}</h1>
      <p class="title">{{ metadata().title }}</p>
      <p class="contact-line">
        @for (item of contactItems(); track item.label; let last = $last) {
          @if (item.href) {
            <a [href]="item.href" target="_blank" rel="noopener noreferrer">{{ item.label }}</a>
          } @else {
            <span>{{ item.label }}</span>
          }
          @if (!last) {
            <span class="sep"> • </span>
          }
        }
      </p>
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

        a {
          color: inherit;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }

        .sep {
          white-space: pre;
        }
      }
    }
  `,
})
export class ResumeHeader {
  metadata = input.required<ResumeMetadata>();

  contactItems = computed<ContactItem[]>(() => {
    const c: ResumeContact = this.metadata().contact;
    const items: ContactItem[] = [];
    if (c.email) items.push({ label: c.email, href: `mailto:${c.email}` });
    if (c.phone) items.push({ label: c.phone, href: `tel:${c.phone.replace(/\s/g, '')}` });
    if (c.location) items.push({ label: c.location });
    if (c.linkedin)
      items.push({
        label: c.linkedin,
        href: c.linkedin.startsWith('http') ? c.linkedin : `https://${c.linkedin}`,
      });
    if (c.github)
      items.push({
        label: c.github,
        href: c.github.startsWith('http') ? c.github : `https://${c.github}`,
      });
    if (c.website)
      items.push({
        label: c.website,
        href: c.website.startsWith('http') ? c.website : `https://${c.website}`,
      });
    return items;
  });
}
