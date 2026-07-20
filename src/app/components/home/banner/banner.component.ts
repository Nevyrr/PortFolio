import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { AnimationsService } from '../../../services/animations/animations.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  standalone: false
})
export class BannerComponent implements AfterViewInit {

  constructor(
    private animationsService: AnimationsService,
    private elementRef: ElementRef
  ) { }

  ngAfterViewInit(): void {
    this.initAnimations();
  }

  private initAnimations(): void {
    const banner = this.elementRef.nativeElement;

    const pretitle = banner.querySelector('.banner-pretitle h1');
    if (pretitle) {
      this.animationsService.observeElement(pretitle, { type: 'fadeInDown', duration: 600, delay: 100 });
    }

    const name = banner.querySelector('.banner-name');
    if (name) {
      this.animationsService.observeElement(name, { type: 'typewriter', delay: 800 });
    }

    const subtitle = banner.querySelector('.banner-subtitle');
    if (subtitle) {
      this.animationsService.observeElement(subtitle, { type: 'fadeInUp', duration: 500, delay: 1800 });
    }

    const description = banner.querySelector('.banner-description');
    if (description) {
      this.animationsService.observeElement(description, { type: 'morphIn', duration: 1000, delay: 2400 });
    }

    const button = banner.querySelector('.div-btn-banner');
    if (button) {
      this.animationsService.observeElement(button, { type: 'scaleIn', duration: 500, delay: 3000 });
    }
  }
}
