import { Component } from '@angular/core';
import { DomToPdfService } from '@app/services/dom-to-pdf.service';

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
        '04-vrteek.md',
    ];

    experiencesPage2: string[] = [
        '03-escapehd.md',
        '02-freelance.md',
        '01-system-admin.md',
    ];

    constructor(public domToPdf: DomToPdfService) {}
}
