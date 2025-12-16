import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { AnimationsService } from '../../../services/animations/animations.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    standalone: false
})
export class ContactComponent implements OnInit, AfterViewInit {

  constructor(
    private animationsService: AnimationsService,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initAnimations();
  }

  private initAnimations(): void {
    const contactSection = this.elementRef.nativeElement;

    // Animer le conteneur du titre
    const titleContainer = contactSection.querySelector('.mb-4');
    if (titleContainer) {
      this.animationsService.observeElement(titleContainer, {
        type: 'fadeInDown',
        duration: 1000
      });
    }

    // Animer le titre principal avec typewriter
    const mainTitle = contactSection.querySelector('.contact-title');
    if (mainTitle) {
      this.animationsService.observeElement(mainTitle, {
        type: 'typewriter',
        delay: 500
      });
    }

    // Animer le paragraphe de description
    const description = contactSection.querySelector('p');
    if (description) {
      this.animationsService.observeElement(description, {
        type: 'morphIn',
        duration: 1200,
        delay: 2500
      });
    }

    // Animer le bouton de contact
    const contactButton = contactSection.querySelector('.contact-btn');
    if (contactButton) {
      this.animationsService.observeElement(contactButton.parentElement as HTMLElement, {
        type: 'scaleIn',
        duration: 800,
        delay: 3500
      });

      // Ajouter des effets au survol spéciaux au bouton
      this.animationsService.addHoverEffects(contactButton as HTMLElement, ['lift', 'glow']);
    }
  }
}
