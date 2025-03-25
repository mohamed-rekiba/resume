import { Component } from '@angular/core';
import { DomToPdfService } from '@app/services/dom-to-pdf.service';

@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.scss'],
    standalone: false
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
                'In addition to overseeing the management of both company and client secrets, I played an integral role within the secrets team, ensuring their utmost security.',
                'Implemented <span class="experience__highlight">OKTA/OIDC</span> authentication with <span class="experience__highlight">MFA</span> and developed vault identity groups, creating secure integrations between <span class="experience__highlight">Vault</span>, <span class="experience__highlight">EKS</span>, <span class="experience__highlight">Terraform Cloud</span>, and <span class="experience__highlight">GitHub Actions</span>.',
                'Collaborated across teams to establish secure AWS connectivity, implement service-provider features, and create documentation reducing onboarding time by <span class="experience__highlight">40%</span>.',
                'Refactored multiple repositories into a mono-repo architecture, reducing deployment issues by <span class="experience__highlight">30%</span> while enhancing <span class="experience__highlight">HashiCorp Vault</span> package with improved test coverage.',
            ],
        },
        {
            title: 'Senior Devops Engineer',
            company: 'Cequens',
            period: '2020 - 2023',
            descriptions: [
                'Revamped the legacy infrastructure, ensuring a seamless transition to full automation on <span class="experience__highlight">AWS</span>.',
                'Transformed the AWS infrastructure into a hybrid setup, where AWS was exclusively used for hosting the source code and pipeline, while <span class="experience__highlight">Kubernetes</span> played a crucial role in managing other vital components.',
                'Establish and oversee infrastructure within the <span class="experience__highlight">stc Cloud</span> platform.',
                `Supervised the administration of infrastructure to meet the high-traffic demands of <span class="experience__highlight">Al Rajhi Bank</span>`,
                'Proficiently managed Linux distributions for smooth operations and stability.',
                'Implemented auto-scaling strategies to dynamically adjust resources based on traffic demands, ensuring seamless performance even during high-traffic spikes.',
                'Created and maintained Docker containers with <span class="experience__highlight">ECS</span>, offering efficient containerization similar to Kubernetes.',
                'Developed and managed Data Lakes using AWS tools for centralized data storage.',
                'Leveraged <span class="experience__highlight">Terraform</span> and <span class="experience__highlight">Ansible</span> for Infrastructure as Code principles.',
                'Implemented automation pipelines using <span class="experience__highlight">AWS CodePipeline</span>, <span class="experience__highlight">GitHub</span> and <span class="experience__highlight">Gitlab</span>.',
                'Designed and automated Firewalls like <span class="experience__highlight">pfSense</span> with Ansible for enhanced security.',
                'Utilized auto-scaling groups to efficiently handle varying workloads and ensure optimal resource allocation.',
                'Worked with <span class="experience__highlight">Apache</span>, <span class="experience__highlight">Nginx</span>, <span class="experience__highlight">Traefik</span>, and <span class="experience__highlight">HaProxy</span> for optimized web serving, proxying ... etc.',
                'Utilized <span class="experience__highlight">SonarQube</span> for code quality assessment in CI/CD pipelines.',
                'Experienced with telecommunication protocols like <span class="experience__highlight">SS7</span> and <span class="experience__highlight">Sigtran</span>.',
                'Used AWS CloudWatch and Datadog for proactive monitoring and alerts.',
                'Engineered and optimized <span class="experience__highlight">high-traffic</span> infrastructure with <span class="experience__highlight">auto-scaling</span> capabilities for maximum performance.',
                'Led effective git branch strategies for efficient collaboration.',
                'Designed a Python agent for pfSense logs and monitoring dashboards.',
                'Demonstrated programming skills in <span class="experience__highlight">Python</span>, <span class="experience__highlight">Golang</span>, <span class="experience__highlight">C#</span>, <span class="experience__highlight">Javascript</span>, <span class="experience__highlight">Typescript</span>, <span class="experience__highlight">PHP</span>, <span class="experience__highlight">Lua</span> and <span class="experience__highlight">Shell Scripting</span>.',
            ],
        },
        {
            title: 'Senior Software Engineer',
            company: 'Cequens',
            period: '2019 - 2020',
            descriptions: [
                'Developed and maintained <span class="experience__highlight">interfaces</span>, <span class="experience__highlight">APIs</span>, and <span class="experience__highlight">SDKs</span>.',
                'Created <span class="experience__highlight">Bulk Runner</span> (Desktop app and API server), a generic app/service for sending bulk requests using CSV files.',
                'Worked extensively with <span class="experience__highlight">AWS</span> services and microservices architecture.',
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
        {
            title: 'Software Engineer',
            company: 'Freelance (Self employed)',
            period: '2014 - 2015',
            descriptions: [
                'PHP Developer using Codeigniter, Laravel Frameworks, MySQL Database & Linux System Administrator.',
            ],
        },
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
