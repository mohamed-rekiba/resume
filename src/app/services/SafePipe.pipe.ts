import { Pipe, PipeTransform } from '@angular/core';
import {
    DomSanitizer,
    SafeHtml,
    SafeResourceUrl,
    SafeScript,
    SafeStyle,
    SafeUrl,
} from '@angular/platform-browser';

@Pipe({ name: 'safe', standalone: true })
export class SafePipe implements PipeTransform {
    constructor(protected sanitizer: DomSanitizer) {}

    public transform(
        value: any,
        type: string,
    ): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
        switch (type) {
            case 'url':
                return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            case 'html':
                return this.sanitizer.bypassSecurityTrustHtml(value);
            default:
                throw Error(`Unkouwn safe type: ${type}`);
        }
    }
}
