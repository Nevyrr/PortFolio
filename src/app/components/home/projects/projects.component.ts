import { Component, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

export interface Project {
  Title: string;
  Description: string;
  imgs: string[];
  ghLink?: string;
  demoLink?: string;
  Technologies: string[];
}

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
    standalone: false
})
export class ProjectsComponent implements OnDestroy {

  featuredProjects: Project[] = [];
  otherProjects: Project[] = [];

  private projectsSubscription: Subscription;

  constructor(private translateService: TranslateService) {
    this.projectsSubscription = this.translateService.stream('FeatureProjects.Projects').subscribe((projects: Project[]) => {
      this.featuredProjects = projects.filter(project => project.imgs?.length > 0);
      this.otherProjects = projects.filter(project => !project.imgs?.length);
    });
  }

  ngOnDestroy(): void {
    this.projectsSubscription.unsubscribe();
  }
}
