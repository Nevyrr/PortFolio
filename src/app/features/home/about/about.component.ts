import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RevealDirective } from '../../../core/directives/reveal.directive';

@Component({
  selector: 'app-about',
  imports: [TranslateModule, RevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {

  protected readonly skills: readonly string[] = [
    'Angular',
    'RxJS',
    'React',
    'MERN Stack',
    'Node',
    'HTML & (S)CSS',
    'Cesium',
    'ThreeJs',
    'Express',
    'Jenkins',
    'Docker',
    'CI / CD',
    'Bitbucket',
    'Jira',
    'Unreal Engine',
    'Unity',
  ];
}
