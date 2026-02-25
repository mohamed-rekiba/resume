import { PageBreakService } from './page-break.service';

describe('PageBreakService', () => {
  let service: PageBreakService;

  beforeEach(() => {
    service = new PageBreakService();
  });

  it('should place all blocks on one page when they fit', () => {
    const blocks = [
      { index: 0, height: 200 },
      { index: 1, height: 300 },
      { index: 2, height: 400 },
    ];

    const pages = service.paginate(blocks);
    expect(pages.length).toBe(1);
    expect(pages[0]).toEqual([0, 1, 2]);
  });

  it('should create a new page when a block overflows', () => {
    const blocks = [
      { index: 0, height: 600 },
      { index: 1, height: 500 },
    ];

    const pages = service.paginate(blocks);
    expect(pages.length).toBe(2);
    expect(pages[0]).toEqual([0]);
    expect(pages[1]).toEqual([1]);
  });

  it('should handle block that exceeds full page height', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    const blocks = [
      { index: 0, height: 100 },
      { index: 1, height: 1200 },
      { index: 2, height: 100 },
    ];

    const pages = service.paginate(blocks);
    expect(pages.length).toBeGreaterThanOrEqual(2);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should return empty array for no blocks', () => {
    const pages = service.paginate([]);
    expect(pages.length).toBe(0);
  });

  it('should start a new page when remaining space is insufficient', () => {
    const blocks = [
      { index: 0, height: 800 },
      { index: 1, height: 200 },
    ];

    const pages = service.paginate(blocks);
    expect(pages.length).toBe(2);
    expect(pages[0]).toEqual([0]);
    expect(pages[1]).toEqual([1]);
  });

  it('should distribute many small blocks across pages', () => {
    const blocks = Array.from({ length: 20 }, (_, i) => ({
      index: i,
      height: 100,
    }));

    const pages = service.paginate(blocks);
    expect(pages.length).toBe(3);

    for (const page of pages) {
      const totalHeight = page.reduce((sum, idx) => sum + blocks[idx].height, 0);
      expect(totalHeight).toBeLessThanOrEqual(970);
    }
  });
});
