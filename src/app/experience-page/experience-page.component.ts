import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-experience-page',
  imports: [CommonModule],
  templateUrl: './experience-page.component.html',
  styleUrl: './experience-page.component.scss',
})
export class ExperiencePageComponent {
  experiences = [
    {
      company: 'Proclink Consulting Services LLP',
      role: 'Graduate Engineer Trainee',
      duration: 'May 2024 - April 2025',
      description:
        'Worked on Angular-based SPA applications and UI improvements.',
    },
    {
      company: 'Proclink Consulting Services LLP',
      role: 'Associate Software Engineer',
      duration: 'April 2025 - Present',
      description:
        'Worked on Angular-based SPA applications and UI improvements.',
    },
  ];
}
