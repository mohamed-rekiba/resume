import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

marked.use({ gfm: true });

@Pipe({ name: 'markdownInline', standalone: true })
export class MarkdownInlinePipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  transform(value: string): SafeHtml {
    if (!value) return '';

    const html = marked.parseInline(value, { async: false }) as string;
    const withExternalLinks = html.replace(
      /<a href="/g,
      '<a target="_blank" rel="noopener noreferrer" href="',
    );

    return this.sanitizer.bypassSecurityTrustHtml(withExternalLinks);
  }
}
