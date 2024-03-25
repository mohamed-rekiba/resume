import { TestBed } from '@angular/core/testing';

import { DomToPdfService } from './dom-to-pdf.service';

describe('DomToPdfService', () => {
    let service: DomToPdfService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DomToPdfService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
