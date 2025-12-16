import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { AnimationsService } from '../../../services/animations/animations.service';

// Configuration centralisée des animations
interface AnimationConfig {
  delay: number;
  duration?: number;
  element: string;
  action: () => void;
}

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  standalone: false
})
export class BannerComponent implements OnInit, AfterViewInit, OnDestroy {

  // Configuration facile à modifier
  private readonly animationTimings: Readonly<Record<string, number>> = {
    pretitle: 100,
    name: 800,
    subtitle: 1800,
    description: 2400,
    button: 3000
  };

  private readonly typewriterConfig = {
    speed: 80,
    cursorBlinkRate: 500
  };

  private animationTimeouts: number[] = [];
  private cursorBlinkInterval?: number;
  private typeEffectInterval?: number;

  constructor(
    private animationsService: AnimationsService,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    // Configuration initiale si nécessaire
  }

  ngAfterViewInit(): void {
    this.initAnimations();
  }

  ngOnDestroy(): void {
    this.clearAllTimeouts();
    this.clearAllIntervals();
  }

  private initAnimations(): void {
    const banner = this.elementRef.nativeElement;

    // Configuration d'animations séquentielles
    const animations: AnimationConfig[] = [
      {
        delay: this.animationTimings.pretitle,
        element: '.banner-pretitle h1',
        action: () => this.animatePretitle(banner)
      },
      {
        delay: this.animationTimings.name,
        element: '.banner-name',
        action: () => this.animateTypewriter(banner)
      },
      {
        delay: this.animationTimings.subtitle,
        element: '.banner-subtitle',
        action: () => this.animateSubtitle(banner)
      },
      {
        delay: this.animationTimings.description,
        element: '.banner-description',
        action: () => this.animateMorph(banner)
      },
      {
        delay: this.animationTimings.button,
        element: '.main-btn',
        action: () => this.animateButton(banner)
      }
    ];

    this.executeAnimations(animations);
  }

  private executeAnimations(animations: AnimationConfig[]): void {
    animations.forEach(animation => {
      const timeoutId = window.setTimeout(() => {
        animation.action();
      }, animation.delay);

      this.animationTimeouts.push(timeoutId);
    });
  }

  private animatePretitle(banner: HTMLElement): void {
    const pretitle = banner.querySelector('.banner-pretitle h1') as HTMLElement;
    if (!pretitle) return;

    pretitle.style.opacity = '1';
    pretitle.style.transform = 'translateY(0)';
  }

  private animateSubtitle(banner: HTMLElement): void {
    const subtitle = banner.querySelector('.banner-subtitle') as HTMLElement;
    if (!subtitle) return;

    subtitle.style.opacity = '1';
    subtitle.style.transform = 'translateY(0)';
  }

  private animateTypewriter(banner: HTMLElement): void {
    const nameElement = banner.querySelector('.banner-name') as HTMLElement;
    if (!nameElement) return;

    const originalText = nameElement.textContent || '';
    nameElement.innerHTML = `<span class="typed-text"></span><span class="cursor">|</span>`;

    const typedTextElement = nameElement.querySelector('.typed-text') as HTMLElement;
    const cursorElement = nameElement.querySelector('.cursor') as HTMLElement;

    nameElement.style.opacity = '1';

    this.startCursorBlink(cursorElement);
    this.startTypeEffect(typedTextElement, originalText);
  }

  private startCursorBlink(cursorElement: HTMLElement): void {
    let cursorVisible = true;
    this.cursorBlinkInterval = window.setInterval(() => {
      cursorElement.style.opacity = cursorVisible ? '0' : '1';
      cursorVisible = !cursorVisible;
    }, this.typewriterConfig.cursorBlinkRate);
  }

  private startTypeEffect(textElement: HTMLElement, text: string): void {
    let charIndex = 0;

    this.typeEffectInterval = window.setInterval(() => {
      textElement.textContent = text.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex >= text.length && this.typeEffectInterval) {
        clearInterval(this.typeEffectInterval);
        this.typeEffectInterval = undefined;
      }
    }, this.typewriterConfig.speed);
  }

  private animateMorph(banner: HTMLElement): void {
    const description = banner.querySelector('.banner-description') as HTMLElement;
    if (!description) return;

    description.style.setProperty('opacity', '0', 'important');
    description.style.setProperty('transform', 'translateY(20px)', 'important');
    description.style.setProperty('filter', 'blur(3px)', 'important');
    description.style.setProperty('transition', 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)', 'important');

    requestAnimationFrame(() => {
      description.style.setProperty('opacity', '1', 'important');
      description.style.setProperty('transform', 'translateY(0)', 'important');
      description.style.setProperty('filter', 'blur(0px)', 'important');
    });
  }

  private animateButton(banner: HTMLElement): void {
    const button = banner.querySelector('.main-btn') as HTMLElement;
    if (!button) return;

    button.style.opacity = '1';
    button.style.transform = 'scale(1)';
  }

  private clearAllTimeouts(): void {
    this.animationTimeouts.forEach(id => clearTimeout(id));
    this.animationTimeouts = [];
  }

  private clearAllIntervals(): void {
    if (this.cursorBlinkInterval) {
      clearInterval(this.cursorBlinkInterval);
      this.cursorBlinkInterval = undefined;
    }
    if (this.typeEffectInterval) {
      clearInterval(this.typeEffectInterval);
      this.typeEffectInterval = undefined;
    }
  }

  public updateAnimationTiming(element: string, delay: number): void {
    // Note: Cette méthode nécessiterait de rendre animationTimings mutable
    // ou d'utiliser une structure de données différente pour permettre les mises à jour
    // Pour l'instant, elle est conservée mais ne fonctionne pas avec readonly
    console.warn('updateAnimationTiming: animationTimings est readonly, cette méthode ne peut pas modifier les valeurs');
  }

  public updateTypewriterSpeed(speed: number): void {
    this.typewriterConfig.speed = speed;
  }

  public updateCursorBlinkRate(rate: number): void {
    this.typewriterConfig.cursorBlinkRate = rate;
  }
}
