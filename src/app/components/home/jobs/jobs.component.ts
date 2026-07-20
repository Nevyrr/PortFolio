import { Component, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AnimationsService } from '../../../services/animations/animations.service';

interface Job {
  Tab: string;
  Title: string;
  Date: string;
  Description: string[];
}

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.scss'],
    standalone: false
})
export class JobsComponent implements AfterViewInit, OnDestroy {

  active: number = 0;
  jobs: Job[] = [];

  private jobsSubscription: Subscription;

  constructor(
    private animationsService: AnimationsService,
    private elementRef: ElementRef,
    private translateService: TranslateService
  ) {
    this.jobsSubscription = this.translateService.stream('Experience.Jobs').subscribe((jobs: Job[]) => {
      this.jobs = jobs;
      this.active = 0;
      setTimeout(() => this.animateTabs(), 0);
    });
  }

  ngAfterViewInit(): void {
    this.initAnimations();
  }

  ngOnDestroy(): void {
    this.jobsSubscription.unsubscribe();
  }

  private initAnimations(): void {
    const jobsSection = this.elementRef.nativeElement;

    const title = jobsSection.querySelector('.about-title');
    if (title) {
      this.animationsService.observeElement(title, {
        type: 'slideInUp',
        duration: 1000
      });
    }

    const tabsContainer = jobsSection.querySelector('.jobs-tabs');
    if (tabsContainer) {
      this.animationsService.observeElement(tabsContainer as HTMLElement, {
        type: 'fadeInUp',
        duration: 1200,
        delay: 300
      });
    }
  }

  private animateTabs(): void {
    const jobsSection = this.elementRef.nativeElement;

    const tabs = jobsSection.querySelectorAll('.jobs-tab-list li');
    tabs.forEach((tab: HTMLElement, index: number) => {
      this.animationsService.observeElement(tab, {
        type: 'scaleIn',
        delay: 600 + (index * 150)
      });

      this.animationsService.addHoverEffects(tab, ['lift']);
    });

    const jobDescriptions = jobsSection.querySelectorAll('.job-description');
    jobDescriptions.forEach((desc: HTMLElement, index: number) => {
      this.animationsService.observeElement(desc, {
        type: 'fadeInLeft',
        delay: index * 200
      });
    });
  }
}
