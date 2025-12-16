import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, query, transition, stagger, animate } from '@angular/animations';
import { UntypedFormControl } from '@angular/forms';
import { LanguageService } from '../../../services/language/language.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    animations: [
        trigger("animateMenu", [
            transition(":enter", [
                query("*", [
                    style({ opacity: 0, transform: "translateY(-50%)" }),
                    stagger(50, [
                        animate("250ms cubic-bezier(0.35, 0, 0.25, 1)", style({ opacity: 1, transform: "none" }))
                    ])
                ])
            ])
        ])
    ],
    standalone: false
})
export class HeaderComponent implements OnInit {

    responsiveMenuVisible: boolean = false;
    languageFormControl: UntypedFormControl = new UntypedFormControl();

    constructor(
        private router: Router,
        public languageService: LanguageService
    ) { }

    ngOnInit(): void {
        this.languageFormControl.valueChanges.subscribe(val => this.languageService.changeLanguage(val));
        this.languageFormControl.setValue(this.languageService.language);

        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.body.setAttribute('data-bs-theme', savedTheme);
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
        this.responsiveMenuVisible = false;
    }

    public downloadCV(): void {
        this.languageService.translateService.get("Header.cvName").subscribe(cvName => {
            window.open(window.location.href + "/../assets/cv/" + cvName, "_blank");
        });
    }

    public changeLanguage(language: string): void {
        this.languageFormControl.setValue(language);
    }

    public toggleTheme(): void {
        const body = document.body;
        const currentTheme = body.getAttribute('data-bs-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }
}
