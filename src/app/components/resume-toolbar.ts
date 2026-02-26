import { Component, ChangeDetectionStrategy, input, inject, computed, signal } from '@angular/core';
import { PdfExportService } from '../services/pdf-export.service';

@Component({
  selector: 'app-resume-toolbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'resume-toolbar' },
  template: `
    <div class="toolbar-inner">
      <span class="page-info">{{ totalPages() }} {{ totalPages() === 1 ? 'page' : 'pages' }}</span>
      <div class="actions">
        <button
          type="button"
          class="btn btn-download"
          (click)="onDownload()"
          [disabled]="downloading()"
          aria-label="Download latest resume PDF"
        >
          {{ downloading() ? 'Downloading…' : 'Download PDF' }}
        </button>
        <button type="button" (click)="onExport()" aria-label="Export resume as PDF">
          Print / Save
        </button>
      </div>
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

    .actions {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    button,
    .btn {
      color: #fff;
      border: none;
      padding: 8px 20px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s;
      text-decoration: none;
      display: inline-block;
    }

    button {
      background: #e94560;

      &:hover {
        background: #c73a52;
      }
      &:active {
        background: #a32e42;
      }
    }

    .btn-download {
      background: #00d4ff22;
      border: 1px solid #00d4ff66;
      color: #00d4ff;

      &:hover:not(:disabled) {
        background: #00d4ff33;
        border-color: #00d4ff;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    @media screen and (max-width: 600px) {
      :host {
        padding: 8px 12px;
      }

      .page-info {
        font-size: 12px;
      }

      button,
      .btn {
        padding: 6px 12px;
        font-size: 12px;
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
  name = input.required<string>();

  downloadFilename = computed(() => this.name().toLowerCase().replace(/\s+/g, '_') + '_resume.pdf');
  downloading = signal(false);

  private pdf = inject(PdfExportService);

  async onDownload(): Promise<void> {
    this.downloading.set(true);
    try {
      const response = await fetch(
        'https://github.com/mohamed-rekiba/resume/releases/latest/download/resume.pdf',
      );
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = this.downloadFilename();
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      this.downloading.set(false);
    }
  }

  onExport(): void {
    this.pdf.print();
  }
}
