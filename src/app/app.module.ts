import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { ICONS, initIconsFactory } from './utils/svg-icons';
import { MatIconRegistry } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        HomeModule,
    ],
    providers: [
        // Load the SVG icons
        {
            provide: ICONS,
            useValue: ['linkedin', 'github', 'npm'],
        },
        {
            provide: APP_INITIALIZER,
            useFactory: initIconsFactory,
            deps: [ICONS, MatIconRegistry, DomSanitizer],
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
