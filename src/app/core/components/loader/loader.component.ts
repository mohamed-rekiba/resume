import {
    AfterViewChecked,
    Component,
    WritableSignal,
    signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { delay, of, take } from 'rxjs';

@Component({
    selector: 'app-loader',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements AfterViewChecked {
    loaded: WritableSignal<boolean> = signal(false);

    constructor() {}

    ngAfterViewChecked(): void {
        of(null)
            .pipe(take(1), delay(1000))
            .subscribe(() => this.loaded.set(true));
    }
}
