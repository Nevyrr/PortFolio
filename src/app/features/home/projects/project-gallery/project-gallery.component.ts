import { Component, ElementRef, ViewChild, input, signal } from '@angular/core';

@Component({
  selector: 'app-project-gallery',
  imports: [],
  templateUrl: './project-gallery.component.html',
  styleUrl: './project-gallery.component.scss',
})
export class ProjectGalleryComponent {

  readonly images = input<string[]>([]);
  readonly alt = input('');

  @ViewChild('track') private track?: ElementRef<HTMLElement>;

  protected readonly activeIndex = signal(0);

  protected goTo(index: number): void {
    const trackElement = this.track?.nativeElement;
    if (!trackElement) return;

    this.activeIndex.set(index);
    trackElement.scrollTo({ left: trackElement.clientWidth * index, behavior: 'smooth' });
  }

  protected onScroll(): void {
    const trackElement = this.track?.nativeElement;
    if (!trackElement || trackElement.clientWidth === 0) return;

    this.activeIndex.set(Math.round(trackElement.scrollLeft / trackElement.clientWidth));
  }
}
