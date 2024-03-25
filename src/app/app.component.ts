import { DOCUMENT } from '@angular/common';
import {
    AfterViewInit,
    Component,
    ElementRef,
    Inject,
    Renderer2,
} from '@angular/core';
import { delay, of, take } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private el: ElementRef,
        private render: Renderer2,
    ) {}

    ngAfterViewInit(): void {
        of(null)
            .pipe(take(1), delay(500))
            .subscribe(() => {
                this.render.addClass(this.document.body, 'loaded');
                const { width: printWidth } =
                    this.el.nativeElement.getBoundingClientRect();
                const { width: bodyWidth } =
                    this.document.body.getBoundingClientRect();
                const containerWidth = Math.min(bodyWidth, 1240);
                const zoom = (containerWidth / printWidth) * 100 - 5;
                this.render.setStyle(this.el.nativeElement, 'zoom', `${zoom}%`);
            });
    }
}
