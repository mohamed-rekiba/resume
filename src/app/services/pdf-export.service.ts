import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PdfExportService {
  /** Triggers the browser's native Print dialog, which supports Save-as-PDF. */
  print(): void {
    window.print();
  }
}
