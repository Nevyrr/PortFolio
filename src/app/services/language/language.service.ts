import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';

@Injectable({
	providedIn: 'root'
})
export class LanguageService {

	public language: "fr" | "en" = "fr";

	constructor(
		public translateService: TranslateService,
		private location: Location,
	) { }

	public initLanguage(): void {
		this.translateService.addLangs(["en", "fr"]);
		
		// Déterminer la langue du navigateur de manière sécurisée
		const browserLanguage: string = navigator.language || 
			(navigator as Navigator & { userLanguage?: string }).userLanguage || 
			'en';
		
		const detectedLanguage: "fr" | "en" = browserLanguage.split("-")[0] === "fr" ? "fr" : "en";
		this.translateService.setDefaultLang(detectedLanguage);
		this.location.go(detectedLanguage);
		this.language = detectedLanguage;

		const savedLanguage: string | null = localStorage.getItem('language');
		if (savedLanguage && (savedLanguage === "fr" || savedLanguage === "en")) {
			this.changeLanguage(savedLanguage);
		}
	}

	public changeLanguage(language: "fr" | "en"): void {
		this.translateService.setDefaultLang(language);
		this.location.go(language);
		this.language = language;
		localStorage.setItem('language', language);
	}
}
