import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-project-gallery',
  templateUrl: './project-gallery.component.html',
  styleUrls: ['./project-gallery.component.scss'],
  standalone: false
})
export class ProjectGalleryComponent {

  @Input() images: string[] = [];
  @Input() alt: string = '';

  @ViewChild('track') track?: ElementRef<HTMLElement>;

  activeIndex: number = 0;

  public goTo(index: number): void {
    const trackEl = this.track?.nativeElement;
    if (!trackEl) return;

    this.activeIndex = index;
    trackEl.scrollTo({
      left: trackEl.clientWidth * index,
      behavior: 'smooth'
    });
  }

  public onScroll(): void {
    const trackEl = this.track?.nativeElement;
    if (!trackEl || trackEl.clientWidth === 0) return;

    this.activeIndex = Math.round(trackEl.scrollLeft / trackEl.clientWidth);
  }
}
