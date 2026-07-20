import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RevealDirective } from '../../../core/directives/reveal.directive';

@Component({
  selector: 'app-hero',
  imports: [TranslateModule, RevealDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {}
