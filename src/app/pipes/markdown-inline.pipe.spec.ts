import { TestBed } from '@angular/core/testing';
import { SafeHtml } from '@angular/platform-browser';
import { MarkdownInlinePipe } from './markdown-inline.pipe';

function unsafeHtml(safe: SafeHtml): string {
  return (safe as unknown as { changingThisBreaksApplicationSecurity: string })
    .changingThisBreaksApplicationSecurity;
}

describe('MarkdownInlinePipe', () => {
  let pipe: MarkdownInlinePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    pipe = TestBed.runInInjectionContext(() => new MarkdownInlinePipe());
  });

  it('renders bold and inline code', () => {
    const html = unsafeHtml(pipe.transform('**Arvel** with `mypy --strict`'));
    expect(html).toContain('<strong>Arvel</strong>');
    expect(html).toContain('<code>mypy --strict</code>');
  });

  it('renders links with external target', () => {
    const html = unsafeHtml(pipe.transform('[arvel.dev](https://arvel.dev)'));
    expect(html).toContain('href="https://arvel.dev"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });
});
