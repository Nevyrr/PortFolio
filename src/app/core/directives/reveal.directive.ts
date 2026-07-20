import { Directive, ElementRef, OnDestroy, afterNextRender, inject, input } from '@angular/core';

export type RevealType =
  | 'fadeInUp'
  | 'fadeInDown'
  | 'fadeInLeft'
  | 'fadeInRight'
  | 'scaleIn'
  | 'slideInUp'
  | 'morphIn'
  | 'typewriter';

const INTERSECTION_OPTIONS: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px 0px -50px 0px',
  threshold: 0.1,
};

@Directive({
  selector: '[appReveal]',
})
export class RevealDirective implements OnDestroy {

  readonly appReveal = input<RevealType>('fadeInUp');
  readonly revealDelay = input(0);
  readonly revealDuration = input(800);

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => this.observe());
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private observe(): void {
    const element = this.elementRef.nativeElement;
    element.classList.add(`reveal-${this.toKebabCase(this.appReveal())}`);
    element.style.setProperty('--reveal-duration', `${this.revealDuration()}ms`);

    this.observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          this.observer?.unobserve(element);
          window.setTimeout(() => this.activate(element), this.revealDelay());
        }
      }
    }, INTERSECTION_OPTIONS);

    this.observer.observe(element);
  }

  private activate(element: HTMLElement): void {
    element.classList.add('reveal-active');

    if (this.appReveal() === 'typewriter') {
      this.playTypewriter(element);
    }
  }

  // Only ever use the typewriter effect on static, non-translated text:
  // it rewrites textContent directly and would desync from Angular's own
  // interpolation binding if applied to a translated value.
  private playTypewriter(element: HTMLElement): void {
    const text = element.textContent ?? '';
    element.textContent = '';
    element.classList.add('reveal-caret');

    let charIndex = 0;
    const interval = window.setInterval(() => {
      charIndex++;
      element.textContent = text.slice(0, charIndex);

      if (charIndex >= text.length) {
        window.clearInterval(interval);
        window.setTimeout(() => element.classList.remove('reveal-caret'), 1200);
      }
    }, 80);
  }

  private toKebabCase(value: string): string {
    return value.replace(/([A-Z])/g, '-$1').toLowerCase();
  }
}
