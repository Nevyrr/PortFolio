import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, transition, animate } from '@angular/animations';
import { UntypedFormControl } from '@angular/forms';
import { LanguageService } from '../../../services/language/language.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('200ms ease-out', style({ opacity: 1 }))
            ]),
            transition(':leave', [
                animate('200ms ease-in', style({ opacity: 0 }))
            ])
        ])
    ],
    standalone: false
})
export class HeaderComponent implements OnInit {

    responsiveMenuVisible: boolean = false;
    scrolled: boolean = false;
    languageFormControl: UntypedFormControl = new UntypedFormControl();
    isDarkTheme: boolean = true;

    constructor(
        private router: Router,
        private elementRef: ElementRef,
        public languageService: LanguageService
    ) { }

    ngOnInit(): void {
        this.languageFormControl.valueChanges.subscribe(val => this.languageService.changeLanguage(val));
        this.languageFormControl.setValue(this.languageService.language);

        this.isDarkTheme = document.documentElement.getAttribute('data-bs-theme') === 'dark';
    }

    @HostListener('window:scroll')
    public onWindowScroll(): void {
        this.scrolled = window.scrollY > 20;
    }

    @HostListener('document:keydown.escape')
    public onEscape(): void {
        this.closeMobileMenu();
    }

    @HostListener('document:click', ['$event'])
    public onDocumentClick(event: MouseEvent): void {
        if (!this.responsiveMenuVisible) return;
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.closeMobileMenu();
        }
    }

    public toggleMobileMenu(): void {
        this.responsiveMenuVisible = !this.responsiveMenuVisible;
    }

    public closeMobileMenu(): void {
        this.responsiveMenuVisible = false;
    }

    public scroll(el: string): void {
        const element = document.getElementById(el);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            const currentLanguage = this.languageService.language;
            this.router.navigate([`/${currentLanguage}`]).then(() => {
                const elementAfterNav = document.getElementById(el);
                if (elementAfterNav) {
                    elementAfterNav.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
        this.closeMobileMenu();
    }

    public downloadCV(): void {
        this.languageService.translateService.get('Header.cvName').subscribe(cvName => {
            window.open(window.location.href + '/../assets/cv/' + cvName, '_blank');
        });
        this.closeMobileMenu();
    }

    public changeLanguage(language: string): void {
        this.languageFormControl.setValue(language);
    }

    public toggleTheme(): void {
        const root = document.documentElement;
        const currentTheme = root.getAttribute('data-bs-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.isDarkTheme = newTheme === 'dark';
    }
}
