import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
    standalone: false
})
export class ProjectsComponent {
    @ViewChild('imgContainer') imgContainer: ElementRef;
}
