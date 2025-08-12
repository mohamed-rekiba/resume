import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HomeComponent } from './home.component';
import { SidebarComponent } from './partials/sidebar/sidebar.component';
import { HomeRoutingModule } from './home-routing.module';
import { ExperienceComponent } from './partials/experience/experience.component';
import { ProjectsComponent } from './partials/projects/projects.component';
import { SafePipe } from '@app/services/SafePipe.pipe';

@NgModule({
    declarations: [
        HomeComponent,
        SidebarComponent,
        ExperienceComponent,
        ProjectsComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        HomeRoutingModule,
        SafePipe,
    ],
})
export class HomeModule {}
