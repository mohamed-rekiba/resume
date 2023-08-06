import { Component } from '@angular/core';
import { DomToPdfService } from '@services/dom-to-pdf.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
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

    contactInfo = [
        {
            title: 'Birth of date',
            value: 'December 12, 1984',
            icon: 'event_note',
            hrefSuffix: '',
        },
        {
            title: 'Education',
            value: 'Bachelor of Commerce',
            icon: 'school',
        },
        {
            title: 'Location',
            value: 'İstanbul, Türkiye',
            icon: 'location_on',
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
            value: '+905467117695',
            icon: 'smartphone',
            hrefSuffix: 'tel:',
        },
    ];

    keywords = [
        'Linux',
        'Cloud Computing',
        'Amazon Web Services (AWS)',
        'Docker',
        'Ansible',
        'IaC',
        'Terraform',
        'SS7',
        'Sigtran',
        'Continuous Integration and Continuous Delivery (CI/CD)',
        'Automation',
        'Software Development',
        'Python (Programming Language)',
        'Git',
        'MySQL',
        'PostgreSQL',
        'JavaScript',
        'TypeScript',
        'angular',
    ];

    constructor(private domToPdf: DomToPdfService) {}

    downloadCV() {
        this.domToPdf.printPdf();
    }
}
