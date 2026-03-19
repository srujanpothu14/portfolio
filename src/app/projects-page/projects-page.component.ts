import { Component } from '@angular/core';

@Component({
  selector: 'app-projects-page',
  imports: [],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.scss',
})
export class ProjectsPageComponent {
  projects = [
    {
      title: 'Cross-Platform Makeup App',
      tech: ['Ionic', 'Angular', 'Node.js', 'MongoDB'],
      points: [
        'Built a cross-platform mobile app for makeup service discovery and management.',
        'Implemented frontend flows, backend APIs, and state-driven user interactions.',
        'Structured the app architecture end-to-end for scalable feature development.',
      ],
      image: 'assets/projects_logo.png',
      github: 'https://github.com/srujanpothu14/makeup_app',
    },
    {
      title: 'Food Business Web Application',
      tech: ['Angular', 'Node.js', 'Express.js', 'MongoDB'],
      points: [
        'Designed a responsive business website to showcase products and services.',
        'Built dynamic sections for product details and business information.',
        'Improved mobile responsiveness and page performance for better UX.',
      ],
      image: 'assets/ecommerce.png',
      github: 'https://github.com/srujanpothu14/BOI',
      live: 'https://boi-ecru.vercel.app',
    },
  ];
}
