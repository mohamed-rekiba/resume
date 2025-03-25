import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { ICONS, initIconsFactory } from './utils/svg-icons';
import { MatIconRegistry } from '@angular/material/icon';
import {
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HomeModule,
    ],
    providers: [
        // Load the SVG icons
        {
            provide: ICONS,
            useValue: ['linkedin', 'github', 'npm'],
        },
        provideAppInitializer(() => {
        const initializerFn = (initIconsFactory)(inject(ICONS), inject(MatIconRegistry), inject(DomSanitizer));
        return initializerFn();
      }),
        provideHttpClient(withInterceptorsFromDi()),
    ],
})
export class AppModule {}
