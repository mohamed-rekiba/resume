import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, Renderer2 } from '@angular/core';
import { delay, of, take } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private render: Renderer2,
    ) {}

    ngAfterViewInit(): void {
        of(null)
            .pipe(take(1), delay(500))
            .subscribe(() => {
                this.render.addClass(this.body, 'loaded');
            });
    }

    get body() {
        return this.document.getElementsByTagName('body')[0] as HTMLElement;
    }
}
