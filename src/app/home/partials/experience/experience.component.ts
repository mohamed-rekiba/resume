import { Component } from '@angular/core';
import { DomToPdfService } from '@app/services/dom-to-pdf.service';

@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent {
    summary =
        'I am a highly motivated and experienced DevOps Engineer with a proven track record of success in delivering high-quality software. I am passionate about open source software development and I am always looking for new challenges. I am confident that I can make a significant contribution to your team.';

    experiences = [
        {
            title: 'Senior Cloud Infrastructure Engineer',
            company: 'McKinsey & Company',
            period: '2023 - 2024',
            descriptions: [
                'In addition to overseeing the management of both company and client secrets, I played an integral role within the secrets team, ensuring their utmost security. Leveraging <span class="experience__highlight">HashiCorp Vault</span> in conjunction with <span class="experience__highlight">Okta</span>, <span class="experience__highlight">GitHub Actions</span>, and our proprietary <span class="experience__highlight">Authorization System</span>, I ensured the secure handling of user and project secrets across various cloud providers and on-premise environments. Furthermore, our collaboration extended to working closely with <span class="experience__highlight">GitGuardian</span> to enhance our security measures and protect sensitive information from unauthorized access.',
            ],
        },
        {
            title: 'Senior Devops Engineer',
            company: 'Cequens',
            period: '2020 - 2023',
            descriptions: [
                'Revamped the legacy infrastructure, ensuring a seamless transition to full automation on <span class="experience__highlight">AWS</span>.',
                'Transformed the <span class="experience__highlight">AWS</span> infrastructure into a hybrid setup, where <span class="experience__highlight">AWS</span> was exclusively used for hosting the source code and pipeline, while <span class="experience__highlight">Kubernetes</span> played a crucial role in managing other vital components.',
                'Establish and oversee infrastructure within the <span class="experience__highlight">stc Cloud</span> platform.',
                `Supervised the administration of infrastructure to meet the high-traffic demands of <span class="experience__highlight">Al Rajhi Bank</span>`,
                'Proficiently managed Linux distributions for smooth operations and stability.',
                'Implemented auto-scaling strategies to dynamically adjust resources based on traffic demands, ensuring seamless performance even during high-traffic spikes.',
                'Created and maintained Docker containers with ECS, offering efficient containerization similar to Kubernetes.',
                'Developed and managed Data Lakes using AWS tools for centralized data storage.',
                'Leveraged Terraform and Ansible for Infrastructure as Code principles.',
                'Implemented automation pipelines using AWS CodePipeline and Gitlab.',
                'Designed and automated Firewalls like pfSense with Ansible for enhanced security.',
                'Utilized auto-scaling groups to efficiently handle varying workloads and ensure optimal resource allocation.',
                'Worked with Apache, Nginx, and HaProxy for optimized web serving, proxying ... etc.',
                'Utilized SonarQube for code quality assessment in CI/CD pipelines.',
                'Experienced with telecommunication protocols like SS7 and Sigtran.',
                'Used AWS CloudWatch and Datadog for proactive monitoring and alerts.',
                'Engineered and optimized high-traffic infrastructure with auto-scaling capabilities for maximum performance.',
                'Led effective git branch strategies for efficient collaboration.',
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
                'Developed backends and web apps for VR & AR products administration using Laravel, Node.js, Angular 2+, MySQL and CentOS.',
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
        // {
        //     title: 'Software Engineer',
        //     company: 'Freelance (Self employed)',
        //     period: '2014 - 2015',
        //     descriptions: [
        //         'PHP Developer using Codeigniter, Laravel Frameworks, MySQL Database & Linux System Administrator.',
        //     ],
        // },
        // {
        //     title: 'IT Consultant & Linux Administrator',
        //     company: 'Emec',
        //     period: '2008 - 2015',
        //     descriptions: [
        //         'Managed system, network, devices, create linux server include (data center, email, DNS, FTP and proxy).',
        //     ],
        // },
    ];

    constructor(public domToPdf: DomToPdfService) {}
}
