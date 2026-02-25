import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
  signal,
  output,
  viewChildren,
  ElementRef,
  afterNextRender,
  inject,
} from '@angular/core';
import { type Resume, buildBlocks } from '../models/resume.model';
import { PageBreakService } from '../services/page-break.service';
import { ResumeBlockSwitch } from './resume-block-switch';
import { ResumePage } from './resume-page';

@Component({
  selector: 'app-resume-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ResumeBlockSwitch, ResumePage],
  host: { class: 'resume-preview' },
  template: `
    <!-- Off-screen measurement area: renders all blocks at A4 width to measure heights -->
    <div class="measurement-area" aria-hidden="true">
      @for (block of blocks(); track block.id) {
        <div #measureEl class="resume-block">
          <app-resume-block-switch [block]="block" />
        </div>
      }
    </div>

    <!-- Paginated display -->
    @if (isReady()) {
      <div class="pages-container">
        @for (page of paginatedBlocks(); track $index) {
          <app-resume-page [pageNumber]="$index + 1" [totalPages]="paginatedBlocks().length">
            @for (block of page; track block.id) {
              <div class="resume-block">
                <app-resume-block-switch [block]="block" />
              </div>
            }
          </app-resume-page>
        }
      </div>
    }
  `,
  styles: `
    :host {
      display: block;
    }

    .measurement-area {
      position: absolute;
      left: -9999px;
      top: 0;
      width: 170mm;
      visibility: hidden;
    }

    .pages-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 16px 0;
    }

    .resume-block {
      break-inside: avoid;
      margin-bottom: 8px;
    }

    @media screen and (max-width: 850px) {
      .pages-container {
        padding: 0;
        align-items: flex-start;
        overflow-x: hidden;
      }
    }

    @media print {
      .measurement-area {
        display: none !important;
      }

      .pages-container {
        display: block;
        padding: 0;
      }
    }
  `,
})
export class ResumePreview {
  resume = input.required<Resume>();

  blocks = computed(() => buildBlocks(this.resume()));
  pages = signal<number[][]>([]);
  isReady = signal(false);
  pagesChanged = output<number>();

  paginatedBlocks = computed(() => {
    const allBlocks = this.blocks();
    return this.pages().map((indices) => indices.map((i) => allBlocks[i]));
  });

  private measureEls = viewChildren<ElementRef<HTMLElement>>('measureEl');
  private pageBreak = inject(PageBreakService);

  constructor() {
    afterNextRender(() => {
      this.paginate();
    });
  }

  private paginate(): void {
    const els = this.measureEls();
    const measured = els.map((el, i) => {
      const node = el.nativeElement;
      const margin = parseFloat(getComputedStyle(node).marginBottom) || 0;
      return { index: i, height: node.offsetHeight + margin };
    });

    const result = this.pageBreak.paginate(measured);
    this.pages.set(result);
    this.pagesChanged.emit(result.length);
    this.isReady.set(true);
  }
}
