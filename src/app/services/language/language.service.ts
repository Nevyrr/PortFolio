import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';

@Injectable({
	providedIn: 'root'
})
export class LanguageService {

	public language: "fr" | "en";

	constructor(
		public translateService: TranslateService,
		private location: Location,
	) { }

	public initLanguage(): void {
		this.translateService.addLangs(["en", "fr"]);
		let language = navigator.language || (navigator as any).userLanguage;
		language = language.split("-").includes("fr") ? "fr" : "en";
		this.translateService.setDefaultLang(language);
		this.location.go(language);
		this.language = language;

		const savedLanguage: string | null = localStorage.getItem('language');
		if (savedLanguage) {
			this.changeLanguage(savedLanguage);
		}
	}

	public changeLanguage(language): void {
		this.translateService.setDefaultLang(language);
		this.location.go(language);
		this.language = language;
		localStorage.setItem('language', language);
	}
}
