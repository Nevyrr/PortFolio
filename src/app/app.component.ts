import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  private readonly languageService = inject(LanguageService);

  ngOnInit(): void {
    this.languageService.init();
  }
}
