import { Component, OnInit } from '@angular/core';
import { LanguageService } from './services/language/language.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
    title = 'my-portfolio';

    constructor(private languageService: LanguageService) { }

    ngOnInit(): void {
        this.languageService.initLanguage();
    }

}
