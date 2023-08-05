import { Component, ElementRef, Input } from '@angular/core';
import { DomToPdfService } from '@services/dom-to-pdf.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    @Input() printEl!: ElementRef;

    socialInfo = [
        {
            link: 'https://www.linkedin.com/in/mohamed-rekiba/',
            icon: 'linkedin',
        },
        {
            link: 'https://github.com/mshaaban-tech',
            icon: 'github',
        },
        {
            link: 'https://www.npmjs.com/~m.shaaban',
            icon: 'npm',
        },
    ];

    constructor(private domToPdf: DomToPdfService) {}

    downloadCV() {
        this.domToPdf.toPdf(this.printEl.nativeElement);
    }
}
