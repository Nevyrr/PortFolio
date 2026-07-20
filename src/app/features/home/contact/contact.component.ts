import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RevealDirective } from '../../../core/directives/reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [TranslateModule, RevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {}
