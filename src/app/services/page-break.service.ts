import { Injectable } from '@angular/core';

export interface MeasuredBlock {
  index: number;
  height: number;
}

/** A4 page: 297mm total, 20mm top + 20mm bottom margin = 257mm usable ≈ 970px at 96dpi */
const PAGE_HEIGHT_PX = 970;

@Injectable({ providedIn: 'root' })
export class PageBreakService {
  /**
   * Distributes blocks across pages based on measured heights.
   * Returns an array of pages, each containing the indices of blocks assigned to it.
   *
   * Rules:
   * - A block is never split across pages
   * - If a block doesn't fit on the current page (and the page isn't empty), start a new page
   * - If a single block exceeds a full page height, place it on a fresh page (with a warning)
   */
  paginate(blocks: MeasuredBlock[]): number[][] {
    const pages: number[][] = [];
    let currentPage: number[] = [];
    let remaining = PAGE_HEIGHT_PX;

    for (const block of blocks) {
      if (block.height > remaining && currentPage.length > 0) {
        pages.push(currentPage);
        currentPage = [];
        remaining = PAGE_HEIGHT_PX;
      }

      if (block.height > PAGE_HEIGHT_PX) {
        console.warn(
          `Block at index ${block.index} exceeds page height (${block.height}px > ${PAGE_HEIGHT_PX}px). ` +
            'It will be placed on a fresh page and may overflow.',
        );
      }

      currentPage.push(block.index);
      remaining -= block.height;
    }

    if (currentPage.length > 0) {
      pages.push(currentPage);
    }

    return pages;
  }
}
