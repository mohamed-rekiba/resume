import { Component } from '@angular/core';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
    standalone: false
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
                'Desktop tool - built using Angular and Electron.',
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
            title: 'Elkirtasse Softwares',
            description:
                'A set of Linux applications, for example, desktop environment, electronic Quran, Quran library, book library.',
            detailsList: [
                'Home Page: <a href="https://elkirtasse.sourceforge.net" target="_blank">https://elkirtasse.sourceforge.net</a>',
                'Packages Repository: <a href="https://build.opensuse.org/project/show/home:abouzakaria" target="_blank">https://build.opensuse.org/project/show/home:abouzakaria</a>',
            ],
        },
        {
            title: 'Alfanous Quran',
            description:
                'Alfanous is a Quranic search engine that can find any word or aya in the Holy Quran.',
            detailsList: [
                'Home Page: <a href="https://www.alfanous.org" target="_blank">https://www.alfanous.org</a>',
            ],
        },
        {
            title: 'Other Arabic open source software',
            detailsList: [
                'Home Page: <a href="https://www.tahadz.com/" target="_blank">https://www.tahadz.com/</a>',
            ],
        },
    ];
}
