import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  readonly theme = signal<Theme>(this.readCurrentTheme());

  public toggle(): void {
    this.set(this.theme() === 'dark' ? 'light' : 'dark');
  }

  public set(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    this.theme.set(theme);
  }

  private readCurrentTheme(): Theme {
    const attr = document.documentElement.getAttribute('data-theme');
    return attr === 'light' ? 'light' : 'dark';
  }
}
