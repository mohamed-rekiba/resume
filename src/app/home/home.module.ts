import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { HomeComponent } from './home.component';
import { SidebarComponent } from './partials/sidebar/sidebar.component';
import { HomeRoutingModule } from './home-routing.module';
import { ExperienceComponent } from './partials/experience/experience.component';

@NgModule({
    declarations: [HomeComponent, SidebarComponent, ExperienceComponent],
    imports: [CommonModule, MatButtonModule, MatIconModule, HomeRoutingModule],
})
export class HomeModule {}
