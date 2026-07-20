import { Injectable, inject, signal } from '@angular/core';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export type AppLanguage = 'fr' | 'en';

const STORAGE_KEY = 'language';
const SUPPORTED_LANGUAGES: AppLanguage[] = ['fr', 'en'];

@Injectable({ providedIn: 'root' })
export class LanguageService {

  private readonly translateService = inject(TranslateService);
  private readonly location = inject(Location);

  readonly language = signal<AppLanguage>('fr');

  public init(): void {
    this.translateService.addLangs(SUPPORTED_LANGUAGES);
    this.setLanguage(this.resolveInitialLanguage());
  }

  public setLanguage(language: AppLanguage): void {
    this.translateService.setDefaultLang(language);
    this.location.go(language);
    this.language.set(language);
    localStorage.setItem(STORAGE_KEY, language);
  }

  public getCvFileName$() {
    return this.translateService.get('Header.cvName');
  }

  private resolveInitialLanguage(): AppLanguage {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (this.isSupported(saved)) {
      return saved;
    }

    const browserLanguage = navigator.language?.split('-')[0];
    return this.isSupported(browserLanguage) ? browserLanguage : 'en';
  }

  private isSupported(value: string | null | undefined): value is AppLanguage {
    return value === 'fr' || value === 'en';
  }
}
