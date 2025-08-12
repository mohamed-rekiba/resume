import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { of } from 'rxjs';

import { ExperienceComponent } from './experience.component';
import { ContentService } from '@app/services/content.service';
import { DomToPdfService } from '@app/services/dom-to-pdf.service';
import { SafePipe } from '@app/services/SafePipe.pipe';

describe('ExperienceComponent', () => {
    let component: ExperienceComponent;
    let fixture: ComponentFixture<ExperienceComponent>;
    let contentService: jasmine.SpyObj<ContentService>;
    let domToPdfService: jasmine.SpyObj<DomToPdfService>;

    beforeEach(() => {
        const contentServiceSpy = jasmine.createSpyObj('ContentService', ['loadSummary', 'loadExperiences']);
        const domToPdfServiceSpy = jasmine.createSpyObj('DomToPdfService', ['printPdf']);

        TestBed.configureTestingModule({
            declarations: [ExperienceComponent, SafePipe],
            imports: [
                HttpClientTestingModule, 
                MatProgressSpinnerModule,
                MatIconModule,
                MatButtonModule
            ],
            providers: [
                { provide: ContentService, useValue: contentServiceSpy },
                { provide: DomToPdfService, useValue: domToPdfServiceSpy }
            ]
        });

        contentService = TestBed.inject(ContentService) as jasmine.SpyObj<ContentService>;
        domToPdfService = TestBed.inject(DomToPdfService) as jasmine.SpyObj<DomToPdfService>;

        // Setup default return values
        contentService.loadSummary.and.returnValue(of('<p>Test summary</p>'));
        contentService.loadExperiences.and.returnValue(of([]));

        fixture = TestBed.createComponent(ExperienceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load content on init', () => {
        expect(contentService.loadSummary).toHaveBeenCalled();
        expect(contentService.loadExperiences).toHaveBeenCalled();
    });

    it('should handle loading state correctly', () => {
        expect(component.loading).toBeFalse();
        expect(component.error).toBeFalse();
    });

    it('should handle error state', () => {
        contentService.loadSummary.and.returnValue(of(''));
        contentService.loadExperiences.and.returnValue(of([]));
        
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.error).toBeFalse();
    });
});
