import { Component } from '@angular/core';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
    standalone: false,
})
export class ProjectsComponent {
    projects = [
        {
            title: 'Bulk Runner - (For internal use)',
            description:
                'Bulk Runner is an application designed for internal use. It functions similarly to Postman but allows users to send bulk requests into two versions:',
            moreDetails:
                'This app is used to send bulk requests using CSV file format with custom headers, path variables, body, and more. It also has the ability to collect and map responses to a new CSV file.',
            detailsList: [
                'Desktop app - built using Angular and Electron.',
                'API server - built using Python.',
            ],
        },
        {
            title: 'TableBox - (pure TypeScript, SCSS)',
            description:
                'TableBox is a custom HTML table element with various features, including:',
            moreDetails: null,
            detailsList: [
                'Custom properties.',
                'Events listener.',
                'Text formatting with automatic text direction.',
                'Adding columns and rows.',
                'Selecting and merging both columns and rows.',
                'Navigating between cells using arrow keys.',
                'For more details, visit: <a href="https://mohamed-rekiba.github.io/table-box/" target="_blank">https://mohamed-rekiba.github.io/table-box/</a>',
            ],
        },
        // {
        //     title: 'Facebook Messenger Bot Challenge - (Node.js)',
        //     description:
        //         'Tic Tac bot was among the top 60 finalists for the Middle East and Africa in the Facebook Messenger Bot Challenge.',
        //     moreDetails: null,
        //     detailsList: [
        //         'For more information, visit: <a href="https://messengerchallengefinalists.splashthat.com" target="_blank">https://messengerchallengefinalists.splashthat.com</a>',
        //         'Facebook page for Tic Tac bot: <a href="https://facebook.com/TicTac.bot" target="_blank">https://facebook.com/TicTac.bot</a>',
        //         'Facebook page for CaptainLungs: <a href="https://facebook.com/CaptainLungs" target="_blank">https://facebook.com/CaptainLungs</a>',
        //     ],
        // },
        {
            title: 'Kenzy Linux - 2009',
            description:
                'Built my own Linux distribution based on Fedora Linux.',
            moreDetails: null,
            detailsList: [
                'Created my own packages repository at: <a href="https://build.opensuse.org/user/show/Kenzy" target="_blank">https://build.opensuse.org/user/show/Kenzy</a>',
                'First announcement: <a href="https://www.linuxac.org/node/67869" target="_blank">https://www.linuxac.org/node/67869</a>',
            ],
        },
    ];

    osProjects = [
        {
            title: 'openSUSE Build Service - OBS',
            description:
                'Contributed to OBS by resolving RPM spec file processing issues, self-hosting OBS, creating custom Linux distributions and Docker images.',
            moreDetails: null,
            detailsList: [
                'PR: <a href="https://github.com/openSUSE/obs-build/pull/1094" target="_blank">https://github.com/openSUSE/obs-build/pull/1094</a>',
            ],
        },
        {
            title: 'Kenzy Linux - 2009',
            description:
                'Developed and maintained a custom Linux distribution based on Fedora Linux with personalized package management and system configurations.',
            moreDetails: null,
            detailsList: [
                'Created my own packages repository at: <a href="https://build.opensuse.org/user/show/Kenzy" target="_blank">https://build.opensuse.org/user/show/Kenzy</a>',
                'First announcement: <a href="https://www.linuxac.org/node/67869" target="_blank">https://www.linuxac.org/node/67869</a>',
            ],
        },
        {
            title: 'Alfanous Quran',
            description:
                'Contributed to Alfanous, an advanced Quranic search engine designed for comprehensive text search and verse retrieval within the Holy Quran.',
            detailsList: [
                'Home Page: <a href="https://www.alfanous.org" target="_blank">https://www.alfanous.org</a>',
                'Packages Repository: <a href="https://build.opensuse.org/package/show/home:Kenzy:tahadz/alfanous" target="_blank">https://build.opensuse.org/package/show/home:Kenzy:tahadz/alfanous</a>',
                'PRs: <a href="https://github.com/Alfanous-team/alfanous/pulls?q=is%3Apr+author%3Amohamed-rekiba" target="_blank">https://github.com/Alfanous-team/alfanous/pulls?q=is%3Apr+author%3Amohamed-rekiba</a>',
            ],
        },
        // {
        //     title: 'Elkirtasse Softwares',
        //     description:
        //         'A set of Linux applications, for example, desktop environment, electronic Quran, Quran library, book library.',
        //     detailsList: [
        //         'Home Page: <a href="https://elkirtasse.sourceforge.net" target="_blank">https://elkirtasse.sourceforge.net</a>',
        //         'Packages Repository: <a href="https://build.opensuse.org/project/show/home:abouzakaria" target="_blank">https://build.opensuse.org/project/show/home:abouzakaria</a>',
        //     ],
        // },
        // {
        //     title: 'Other Arabic open source software',
        //     detailsList: [
        //         'Home Page: <a href="https://tahadz.com" target="_blank">https://tahadz.com</a>',
        //         'Packages Repository: <a href="https://build.opensuse.org/project/show/home:Kenzy:tahadz" target="_blank">https://build.opensuse.org/project/show/home:Kenzy:tahadz</a>',
        //     ],
        // },
    ];
}
