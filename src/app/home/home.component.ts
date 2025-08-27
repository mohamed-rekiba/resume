import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false,
})
export class HomeComponent {
    experiencesPage1: string[] = [
        '07-vertex-mckinsey.md',
        '06-cequens-senior-devops.md',
        '05-cequens-senior-software.md',
    ];

    experiencesPage2: string[] = [
        '04-vrteek.md',
        '03-escapehd.md',
        '02-freelance.md',
        '01-system-admin.md',
    ];
}
