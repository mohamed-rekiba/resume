import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Injectable({
    providedIn: 'root',
})
export class DomToPdfService {
    constructor(@Inject(DOCUMENT) private document: Document) {}

    get body() {
        return this.document.getElementsByTagName('body')[0] as HTMLElement;
    }

    toPdf(el: HTMLElement) {
        return window.print();
        html2canvas(el).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: 'a4',
            });
            const imageProps = pdf.getImageProperties(imgData);
            const pdfw = pdf.internal.pageSize.getWidth();
            const pdfh = (imageProps.height * pdfw) / imageProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfw, pdfh);
            pdf.save('output.pdf');
            this.body.appendChild(canvas);
        });
    }
}
