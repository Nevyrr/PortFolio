import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { AnimationsService } from '../../../services/animations/animations.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    standalone: false
})
export class AboutComponent implements AfterViewInit {

    constructor(
        private animationsService: AnimationsService,
        private elementRef: ElementRef
    ) { }
    ngAfterViewInit(): void {
        this.initAnimations();
    }

    private initAnimations(): void {
        const aboutSection = this.elementRef.nativeElement;

        // Animer le titre
        const title = aboutSection.querySelector('.about-title');
        if (title) {
            this.animationsService.observeElement(title, {
                type: 'slideInUp',
                duration: 1000
            });
        }

        // Animer les paragraphes avec stagger
        const paragraphs = aboutSection.querySelectorAll('.about-description p');
        paragraphs.forEach((p: HTMLElement, index: number) => {
            this.animationsService.observeElement(p, {
                type: 'fadeInLeft',
                duration: 800,
                delay: 200 + (index * 300)
            });
        });

        // Animer la liste de compétences
        const skillsList = aboutSection.querySelector('.skills-list');
        if (skillsList) {
            this.animationsService.observeElement(skillsList as HTMLElement, {
                type: 'fadeInUp',
                delay: 800
            });
        }

        // Animer les compétences individuelles avec stagger
        const skills = aboutSection.querySelectorAll('.skill-element');
        skills.forEach((skill: HTMLElement, index: number) => {
            this.animationsService.observeElement(skill, {
                type: 'scaleIn',
                delay: 1000 + (index * 100)
            });

            // Ajouter les effets au survol
            this.animationsService.addHoverEffects(skill, ['lift', 'glow']);
        });
    }
}