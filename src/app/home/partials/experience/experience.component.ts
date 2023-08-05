import { Component } from '@angular/core';

@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent {
    experiences = [
        {
            title: 'Cequens - Senior Devops Engineer',
            period: '2020 - Present',
            descriptions: [
                'Designing and Implementing a Secure and Highly Available Hybrid Infrastructure in AWS and On-Premises.',
            ],
        },
        {
            title: 'Cequens - Senior Software Developer',
            period: '2019 - 2020',
            descriptions: [
                'Developed and maintained interfaces, APIs, and SDKs.',
                'Created Bulk Runner, a generic tool for sending bulk requests using CSV files (both desktop tool and API server).',
                'Worked extensively with AWS services and microservices architecture.',
            ],
        },
        {
            title: 'Vrteek - Senior Software Engineer',
            period: '2017 - 2019',
            descriptions: [
                'Developed Brain Coach, a fun game for Tizen OS using HTML, CSS, and JavaScript.',
                'Created Facebook Chat Bots for Messenger Challenge (Tic Tac Toe & Captain Lungs) using Node.js, MySQL, and CentOS.',
                'Developed backend and web app for VR & AR products administration using Node.js, Angular 2, MySQL, and CentOS.',
                'Implemented Three.js 3D model viewer & editor and developed cross-platform mobile apps.',
                'Managed server infrastructure, including dedicated servers and web hosting in AWS and GoDaddy.',
            ],
        },
        {
            title: 'EscapeHD - Software Engineer',
            period: '2015 - 2017',
            descriptions: [
                'Developed backend and web app for administration using Laravel, MySQL and CentOS.',
                'Managed server infrastructure, including dedicated servers and web hosting in AWS and GoDaddy.',
            ],
        },
        {
            title: 'Freelance, self-employed - Software Engineer',
            period: '2014 - 2015',
            descriptions: [
                'PHP Developer using Codeigniter, Laravel Frameworks & MySQL Database Linux System Administrator.',
            ],
        },
        {
            title: 'Emec - IT Consultant & Linux Administrator',
            period: '2008 - 2015',
            descriptions: [
                'Managed system, network, and devices administration.',
                'Created Linux servers using CentOS (email server, data center, DNS server, FTP server, proxy server).',
            ],
        },
    ];
}
