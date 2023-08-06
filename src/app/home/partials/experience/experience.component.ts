import { Component } from '@angular/core';

@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent {
    experiences = [
        {
            title: 'Senior Devops Engineer',
            company: 'Cequens',
            period: '2020 - Present',
            descriptions: [
                'Proficiently managed Linux distributions for smooth operations and stability.',
                'Created and maintained Docker containers with ECS, offering efficient containerization similar to Kubernetes.',
                'Developed and managed Data Lakes using AWS tools for centralized data storage.',
                'Leveraged Terraform and Ansible for Infrastructure as Code principles.',
                'Implemented automation pipelines using AWS CodePipeline and Gitlab.',
                'Designed and automated Firewalls like pfSense with Ansible for enhanced security.',
                'Worked with Apache, Nginx, and HaProxy for optimized web serving, proxying ... etc.',
                'Utilized SonarQube for code quality assessment in CI/CD pipelines.',
                'Experienced with telecommunication protocols like SS7 and Sigtran.',
                'Used AWS CloudWatch and Datadog for proactive monitoring and alerts.',
                'Engineered high-traffic infrastructure with optimal performance.',
                'Led effective git branch strategies for efficient collaboration.',
                "Managed infrastructure for Al Rajhi Bank's high traffic.",
                'Designed a Python agent for pfSense logs and monitoring dashboards.',
                'Demonstrated programming skills in Python, Golang, C#, Javascript, Typescript, PHP, Lua, and Shell scripting.',
            ],
        },
        {
            title: 'Senior Software Engineer',
            company: 'Cequens',
            period: '2019 - 2020',
            descriptions: [
                'Developed and maintained interfaces, APIs, and SDKs.',
                'Created Bulk Runner (Desktop app and API server), a generic app/service for sending bulk requests using CSV files.',
                'Worked extensively with AWS services and microservices architecture.',
            ],
        },
        {
            title: 'Senior Software Engineer',
            company: 'Vrteek',
            period: '2017 - 2019',
            descriptions: [
                'Developed Brain Coach, a fun game for Tizen OS using HTML, CSS and JavaScript.',
                'Created Facebook Chat Bots for Messenger Challenge (Tic Tac Toe & Captain Lungs) using Node.js, MySQL and CentOS.',
                'Developed backend and web app for VR & AR products administration using Node.js, Angular 2, MySQL and CentOS.',
                'Implemented Three.js 3D model viewer & editor and developed cross-platform mobile apps.',
                'Managed server infrastructure, including dedicated servers and web hosting in AWS and GoDaddy.',
            ],
        },
        {
            title: 'Software Engineer',
            company: 'EscapeHD',
            period: '2015 - 2017',
            descriptions: [
                'Developed backend and web app for administration using Laravel, MySQL and CentOS.',
                'Managed server infrastructure, including dedicated servers and web hosting in AWS and GoDaddy.',
            ],
        },
        {
            title: 'Software Engineer',
            company: 'Freelance (Self employed)',
            period: '2014 - 2015',
            descriptions: [
                'PHP Developer using Codeigniter, Laravel Frameworks, MySQL Database & Linux System Administrator.',
            ],
        },
        {
            title: 'IT Consultant & Linux Administrator',
            company: 'Emec',
            period: '2008 - 2015',
            descriptions: [
                'Managed system, network, and devices administration.',
                'Created Linux servers using CentOS (email server, data center, DNS server, FTP server, proxy server).',
            ],
        },
    ];
}
