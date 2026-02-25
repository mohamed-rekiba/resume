import {
  Component,
  ChangeDetectionStrategy,
  input,
  ElementRef,
  inject,
  afterNextRender,
  NgZone,
} from '@angular/core';

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

    @media screen and (max-width: 850px) {
      :host {
        width: 210mm;
        margin-top: 0;
        box-shadow: none;
        transform-origin: top left;
      }
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

  private el = inject(ElementRef<HTMLElement>);
  private zone = inject(NgZone);

  constructor() {
    afterNextRender(() => {
      this.applyMobileScale();
      this.zone.runOutsideAngular(() => {
        window.addEventListener('resize', () => this.applyMobileScale(), { passive: true });
      });
    });
  }

  private applyMobileScale(): void {
    const host = this.el.nativeElement as HTMLElement;
    if (window.innerWidth > 850) {
      host.style.transform = '';
      host.style.marginBottom = '';
      return;
    }
    const scale = window.innerWidth / host.offsetWidth;
    const scaledHeight = host.offsetHeight * scale;
    const gap = 16;
    host.style.transform = `scale(${scale})`;
    host.style.marginBottom = `${scaledHeight - host.offsetHeight + gap}px`;
  }
}
