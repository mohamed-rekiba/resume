import { Injectable } from '@angular/core';
import { default as pdfMake } from 'pdfmake/build/pdfmake';
import { default as pdfFonts } from 'pdfmake/build/vfs_fonts';
import { default as htmlToPdfmake } from 'html-to-pdfmake';

type DomToPdfAction = 'open' | 'download' | 'print';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
    providedIn: 'root',
})
export class DomToPdfService {
    constructor() {}

    toPdf(el: HTMLElement, action: DomToPdfAction) {
        const html = htmlToPdfmake(el.innerHTML);
        const defs = { content: html };
        pdfMake.createPdf(defs)[action]();
    }
}
