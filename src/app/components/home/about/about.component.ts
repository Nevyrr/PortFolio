import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { AnimationsService } from '../../../services/animations/animations.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('300ms ease-in', style({ opacity: 1 }))
            ]),
            transition(':leave', [
                animate('300ms ease-out', style({ opacity: 0 }))
            ])
        ]),
        trigger('zoomIn', [
            transition(':enter', [
                style({ transform: 'scale(0.3)', opacity: 0 }),
                animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ transform: 'scale(1)', opacity: 1 }))
            ])
        ])
    ],
    standalone: false
})
export class AboutComponent implements AfterViewInit {

    isImageModalOpen = false;

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