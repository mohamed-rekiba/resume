import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { delay, of, take } from 'rxjs';

@Component({
    selector: 'app-loader',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements AfterViewInit {
    constructor(
        private el: ElementRef,
        private render: Renderer2,
    ) {}

    ngAfterViewInit(): void {
        of(null)
            .pipe(take(1), delay(500))
            .subscribe(() => {
                this.render.addClass(this.el.nativeElement, 'app-loader--hide');
            });
    }
}
