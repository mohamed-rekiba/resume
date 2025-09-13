import { Component } from '@angular/core';
import { ContentService } from '@app/services/content.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false,
})
export class HeaderComponent {
    name = 'Mohamed Rekiba';
    currentPosition = 'Senior Cloud Infrastructure Engineer';
    socialInfo = [
        {
            link: 'https://www.linkedin.com/in/mohamed-rekiba/',
            icon: 'linkedin',
        },
        {
            link: 'https://github.com/mohamed-rekiba',
            icon: 'github',
        },
        {
            link: 'https://www.npmjs.com/~m.shaaban',
            icon: 'npm',
        },
    ];

    contactInfo = [
        // {
        //     title: 'Date of birth',
        //     value: 'December 12 1984',
        //     icon: 'event_note',
        //     hrefSuffix: '',
        // },
        {
            title: 'Education',
            value: 'Bachelor of Commerce',
            icon: 'school',
        },
        {
            title: 'Location',
            value: 'Dubai, UAE',
            icon: 'person_pin_circle',
            hrefSuffix: '',
        },
        {
            title: 'Email',
            value: 'muhammad.shaban.dev@gmail.com',
            icon: 'mail',
            hrefSuffix: 'mailto:',
        },
        {
            title: 'Phone',
            value: '+971501229435',
            icon: 'smartphone',
            hrefSuffix: 'tel:',
        },
    ];

    summaryContent: string = '';
    loading = true;
    error = false;

    constructor(private contentService: ContentService) {}

    ngOnInit(): void {
        this.loadContent();
    }

    private loadContent(): void {
        this.loading = true;
        this.error = false;

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
}
