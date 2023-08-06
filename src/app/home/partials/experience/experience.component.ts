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
                'Proficiently managed various Linux distributions to ensure smooth operations and system stability.',
                'Successfully created and maintained Docker containers with ECS, offering efficient containerization similar to Kubernetes.',
                'Developed and managed Data Lakes using AWS tools such as Athena, Glue Schema, Kinesis Data Analytics Application, S3 bucket, and Lambda. These Data Lakes served as centralized repositories for storing structured and unstructured data at any scale.',
                'Leveraged Terraform and Ansible to implement Infrastructure as Code (IaC) principles, automating infrastructure provisioning and management, resulting in streamlined processes and reduced deployment time.',
                'Implemented automation infrastructure pipelines using AWS CodePipeline, GitLab pipeline, and GitHub actions, seamlessly integrating services like CodeCommit, CodeBuild, and CodeDeploy.',
                'Designed and automated Firewalls like pfSense using Ansible playbooks, ensuring enhanced security and efficiency.',
                'Proficiently worked with Apache, Nginx, and HaProxy for web serving, reverse proxying, caching, and load balancing, optimizing application performance and user experience.',
                'Utilized SonarQube for Code quality assessment and successfully integrated it with the CI/CD pipeline, maintaining code health and promoting best practices.',
                'Gained valuable experience with telecommunication protocols such as SS7 and Sigtran, contributing to the smooth functioning of communication systems.',
                'Effectively utilized AWS CloudWatch and Datadog for logs, monitoring, and handling alerts, enabling proactive issue identification and resolution.',
                'Successfully engineered high-traffic infrastructure with optimal performance, meeting demanding requirements and ensuring high availability.',
                'Led the implementation of effective git branch strategies, resulting in efficient collaboration and code versioning.',
                'Developed and managed infrastructure to serve high traffic from Al Rajhi Bank, ensuring a smooth user experience for critical clients.',
                'Innovatively designed a Python agent to collect pfSense firewall logs and forward them to a log shipper for creating monitoring dashboards and alerts, enhancing system monitoring capabilities.',
                'Demonstrated extensive programming skills in Python, Golang, C#, Javascript, Typescript, PHP, Lua, and Shell scripting, enabling seamless development and deployment of applications and scripts.',
            ],
        },
        {
            title: 'Cequens - Senior Software Engineer',
            period: '2019 - 2020',
            descriptions: [
                'Developed and maintained interfaces, APIs, and SDKs.',
                'Created Bulk Runner (Desktop app and API server), a generic app/service for sending bulk requests using CSV files.',
                'Worked extensively with AWS services and microservices architecture.',
            ],
        },
        {
            title: 'Vrteek - Senior Software Engineer',
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
                'PHP Developer using Codeigniter, Laravel Frameworks, MySQL Database & Linux System Administrator.',
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
