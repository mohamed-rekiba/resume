import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomToPdfService } from './services/dom-to-pdf.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'resume';
    @ViewChild('pdfTable', { static: false }) pdfTable!: ElementRef;

    constructor(public domToPdf: DomToPdfService) {}
}
