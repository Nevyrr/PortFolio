import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { RevealDirective } from '../../../core/directives/reveal.directive';
import { Job } from '../../../core/models/job.model';

@Component({
  selector: 'app-experience',
  imports: [TranslateModule, RevealDirective],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {

  private readonly translateService = inject(TranslateService);

  protected readonly jobs = toSignal(
    this.translateService.stream('Experience.Jobs') as Observable<Job[]>,
    { initialValue: [] as Job[] },
  );

  protected readonly activeIndex = signal(0);

  protected selectTab(index: number): void {
    this.activeIndex.set(index);
  }
}
