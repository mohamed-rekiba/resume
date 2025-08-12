import { Component, OnInit } from '@angular/core';
import { DomToPdfService } from '@app/services/dom-to-pdf.service';
import { ContentService, Experience } from '@app/services/content.service';

@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.scss'],
    standalone: false
})
export class ExperienceComponent implements OnInit {
    summary = '';
    experiences: Experience[] = [];
    loading = true;
    error = false;

    constructor(
        public domToPdf: DomToPdfService,
        private contentService: ContentService
    ) {}

    ngOnInit(): void {
        this.loadContent();
    }

    private loadContent(): void {
        this.loading = true;
        this.error = false;

        // Load summary and experiences in parallel
        this.contentService.loadSummary().subscribe({
            next: (summary) => {
                this.summary = summary;
            },
            error: (error) => {
                console.error('Error loading summary:', error);
                this.error = true;
            }
        });

        this.contentService.loadExperiences().subscribe({
            next: (experiences) => {
                this.experiences = experiences;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading experiences:', error);
                this.error = true;
                this.loading = false;
            }
        });
    }
}
