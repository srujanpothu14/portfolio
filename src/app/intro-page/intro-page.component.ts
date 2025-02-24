import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.component.html',
  styleUrl: './intro-page.component.scss',
})
export class IntroPageComponent implements AfterViewInit {
  @ViewChild('name') nameElement!: ElementRef;
  @ViewChild('imA') imAElement!: ElementRef;
  @ViewChild('role') roleElement!: ElementRef;

  constructor() {}

  ngAfterViewInit() {
    // Step 1: Animate Name with Smooth Typing
    new Typed(this.nameElement.nativeElement, {
      strings: ['Srujan Pothu'],
      typeSpeed: 60, // Smooth speed
      showCursor: false,
      onComplete: () => {
        // Step 2: Animate "I'm a " smoothly
        new Typed(this.imAElement.nativeElement, {
          strings: ["I'm a "],
          typeSpeed: 50, // Slower for smooth effect
          showCursor: false,
          onComplete: () => {
            // Step 3: Loop Role Animation with Smoothness
            new Typed(this.roleElement.nativeElement, {
              strings: [
                'MEAN Stack Developer',
                'UI Designer',
                'Automation Tester',
              ],
              typeSpeed: 25, // Smooth speed for typing
              backSpeed: 25, // Slightly slower for a natural erase
              backDelay: 800, // More delay before erasing
              smartBackspace: true, // Avoids retyping the same text
              loop: true,
              showCursor: false,
              fadeOut: true, // Smooth fading effect while deleting
              fadeOutClass: 'typed-fade-out',
              fadeOutDelay: 200, // Controls fade speed
            });
          },
        });
      },
    });
  }
}
