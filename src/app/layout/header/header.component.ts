import { Component, ElementRef, HostListener, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppLanguage, LanguageService } from '../../core/services/language.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-header',
  imports: [TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  protected readonly languageService = inject(LanguageService);
  protected readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  protected readonly language = this.languageService.language;
  protected readonly isDarkTheme = computed(() => this.themeService.theme() === 'dark');

  protected readonly mobileMenuOpen = signal(false);
  protected readonly languageMenuOpen = signal(false);
  protected readonly scrolled = signal(false);

  @HostListener('window:scroll')
  protected onWindowScroll(): void {
    this.scrolled.set(window.scrollY > 20);
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.closeMobileMenu();
    this.languageMenuOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.closeMobileMenu();
      this.languageMenuOpen.set(false);
    }
  }

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  protected toggleLanguageMenu(): void {
    this.languageMenuOpen.update((open) => !open);
  }

  protected scroll(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.router.navigate([`/${this.languageService.language()}`]).then(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      });
    }
    this.closeMobileMenu();
  }

  protected downloadCV(): void {
    this.languageService.getCvFileName$().subscribe((cvName) => {
      window.open(`${window.location.href}/../assets/cv/${cvName}`, '_blank');
    });
    this.closeMobileMenu();
  }

  protected changeLanguage(language: AppLanguage): void {
    this.languageService.setLanguage(language);
    this.languageMenuOpen.set(false);
  }

  protected toggleTheme(): void {
    this.themeService.toggle();
  }
}
