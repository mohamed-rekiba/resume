import { Component, ChangeDetectionStrategy, input, inject } from '@angular/core';
import { PdfExportService } from '../services/pdf-export.service';

@Component({
  selector: 'app-resume-toolbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'resume-toolbar' },
  template: `
    <div class="toolbar-inner">
      <span class="page-info">{{ totalPages() }} {{ totalPages() === 1 ? 'page' : 'pages' }}</span>
      <button type="button" (click)="onExport()" aria-label="Export resume as PDF">
        Export PDF
      </button>
    </div>
  `,
  styles: `
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 100;
      background: #1a1a2e;
      color: #eee;
      padding: 10px 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .toolbar-inner {
      max-width: 900px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .page-info {
      font-size: 14px;
      font-weight: 500;
    }

    button {
      background: #e94560;
      color: #fff;
      border: none;
      padding: 8px 20px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s;

      &:hover {
        background: #c73a52;
      }
      &:active {
        background: #a32e42;
      }
    }

    @media screen and (max-width: 600px) {
      :host {
        padding: 8px 12px;
      }

      .page-info {
        font-size: 12px;
      }

      button {
        padding: 6px 14px;
        font-size: 13px;
      }
    }

    @media print {
      :host {
        display: none !important;
      }
    }
  `,
})
export class ResumeToolbar {
  totalPages = input.required<number>();

  private pdf = inject(PdfExportService);

  onExport(): void {
    this.pdf.print();
  }
}
