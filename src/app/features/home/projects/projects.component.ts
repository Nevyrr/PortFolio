import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Project } from '../../../core/models/project.model';
import { ProjectGalleryComponent } from './project-gallery/project-gallery.component';

@Component({
  selector: 'app-projects',
  imports: [TranslateModule, ProjectGalleryComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {

  private readonly translateService = inject(TranslateService);

  private readonly projects = toSignal(
    this.translateService.stream('FeatureProjects.Projects') as Observable<Project[]>,
    { initialValue: [] as Project[] },
  );

  protected readonly featuredProjects = computed(() => this.projects().filter((project) => project.imgs?.length > 0));
  protected readonly otherProjects = computed(() => this.projects().filter((project) => !project.imgs?.length));
}
