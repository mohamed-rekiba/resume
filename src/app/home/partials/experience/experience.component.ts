import { Component, Input, OnInit } from '@angular/core';
import { DomToPdfService } from '@app/services/dom-to-pdf.service';
import { ContentService, Data } from '@app/services/content.service';

@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.scss'],
    standalone: false,
})
export class ExperienceComponent implements OnInit {
    @Input() summary?: boolean;
    @Input() experiences: string[] = [];

    content: Data[] = [];
    summaryContent: string = '';
    loading = true;
    error = false;

    constructor(
        public domToPdf: DomToPdfService,
        private contentService: ContentService,
    ) {}

    ngOnInit(): void {
        this.loadContent();
    }

    private loadContent(): void {
        this.loading = true;
        this.error = false;

        if (this.summary) {
            this.contentService.loadSummary().subscribe({
                next: (content) => {
                    this.summaryContent = content?.content || '';
                },
                error: (error) => {
                    console.error('Error loading summary:', error);
                    this.error = true;
                    this.loading = false;
                },
            });
        }

        this.contentService.loadExperiences(this.experiences).subscribe({
            next: (content) => {
                this.content = content;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading experiences:', error);
                this.error = true;
                this.loading = false;
            },
        });
    }
}
