import { Component } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    standalone: false
})
export class SidebarComponent {
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
            value: 'Istanbul, Türkiye',
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
            value: '+905467117695',
            icon: 'smartphone',
            hrefSuffix: 'tel:',
        },
    ];

    keywords = [
        'Linux',
        'Cloud Computing',
        'Amazon Web Services (AWS)',
        'Continuous Integration and Continuous Delivery (CI/CD)',
        'IaC',
        'Terraform',
        'Kubernetes',
        'Docker',
        'Ansible',
        'Automation',
        'Autoscaling',
        'Nginx',
        'Apache',
        'HAProxy',
        'Traefik',
        'Python',
        'TypeScript',
        'Node.js',
        'Angular',
        'PHP',
        'Laravel',
        'REST API',
        'GraphQL',
        'MySQL',
        'PostgreSQL',
        'MongoDB',
        'Sigtran',
        'SS7',
        'VPN',
        'IPSec',
        'PCAP',
        'SOAP',
        'SMPP',
        'GitGuardian',
        'Okta',
        'MFA',
        'HashiCorp Vault',
    ];
}
