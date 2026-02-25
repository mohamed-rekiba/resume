import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-resume-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'resume-page-wrapper' },
  template: `
    <article class="page">
      <ng-content />
    </article>
    <p class="page-number" aria-hidden="true">Page {{ pageNumber() }} of {{ totalPages() }}</p>
  `,
  styles: `
    :host {
      display: block;
      position: relative;
      margin: 24px auto;
      background: #fff;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
      width: 210mm;
      min-height: 297mm;
    }

    .page {
      width: 100%;
      min-height: 257mm;
      padding: 20mm;
      box-sizing: border-box;
    }

    .page-number {
      text-align: center;
      font-size: 10px;
      color: #999;
      padding-bottom: 8px;
    }

    @media print {
      :host {
        box-shadow: none;
        margin: 0;
        padding: 0;
        width: auto;
        min-height: auto;
      }

      .page {
        padding: 0;
        min-height: auto;
      }

      .page-number {
        display: none;
      }
    }
  `,
})
export class ResumePage {
  pageNumber = input.required<number>();
  totalPages = input.required<number>();
}
