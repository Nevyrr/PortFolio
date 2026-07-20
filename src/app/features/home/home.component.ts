import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { ExperienceComponent } from './experience/experience.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, AboutComponent, ExperienceComponent, ProjectsComponent, ContactComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
