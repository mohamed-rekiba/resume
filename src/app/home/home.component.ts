import { Component } from '@angular/core';
import { ContentService } from '@app/services/content.service';
import { DomToPdfService } from '@app/services/dom-to-pdf.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false,
})
export class HomeComponent {
    experiencesPage1: string[] = [
        '07-vertex-mckinsey.md',
        '06-cequens-senior-devops.md',
        '05-cequens-senior-software.md',
        '04-vrteek.md',
    ];

    experiencesPage2: string[] = [
        '03-escapehd.md',
        '02-freelance.md',
        '01-system-admin.md',
    ];

    coverLetterContent: string = '';

    constructor(
        public domToPdf: DomToPdfService,
        private contentService: ContentService,
    ) {}

    ngOnInit(): void {
        this.loadContent();
    }

    private loadContent(): void {
        this.contentService.loadCoverLetter().subscribe({
            next: (content) => {
                this.coverLetterContent = content?.content || '';
            },
            error: (error) => {
                console.error('Error loading cover letter:', error);
            },
        });
    }
}
