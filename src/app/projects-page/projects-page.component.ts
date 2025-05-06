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
      title: 'E-Commerce Store',
      tech: ['Angular', 'Node.js', 'MongoDB'],
      description:
        'A full-stack clothing e-store with user auth, cart, and order management.',
      image: 'assets/ecommerce.png',
      github: 'https://github.com/yourname/ecommerce',
      live: 'https://ecommerce-demo.com',
    },
    {
      title: 'Portfolio Website',
      tech: ['Angular', 'SCSS'],
      description:
        'My personal portfolio built with Angular featuring responsive UI.',
      image: 'assets/projects/portfolio.png',
      github: 'https://github.com/yourname/portfolio',
      live: 'https://yourportfolio.com',
    },
    {
      title: 'Task Manager App',
      tech: ['Angular', 'Firebase'],
      description:
        'A real-time task manager with CRUD features and authentication.',
      image: 'assets/projects/taskmanager.png',
      github: 'https://github.com/yourname/taskmanager',
      live: 'https://taskmanager-app.com',
    },
  ];
}
