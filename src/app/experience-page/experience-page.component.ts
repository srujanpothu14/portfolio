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
      duration: 'May 2024 - March 2025',
      points: [
        'Designed and developed a full-stack web application independently using the MEAN stack.',
        'Designed and integrated RESTful APIs between frontend and backend modules.',
        'Implemented Angular UI components and backend services using Node.js and Express.js.',
        'Managed MongoDB schema design and data operations for core application features.',
        'Supported QA and development teams in defect analysis and quality improvements.',
      ],
    },
    {
      company: 'Proclink Consulting Services LLP',
      role: 'Associate Software Engineer',
      duration: 'April 2025 - Present',
      points: [
        'Developed 500+ automation test scripts using Selenium WebDriver with C# for web workflow validation.',
        'Migrated and maintained automation frameworks in Playwright with TypeScript for end-to-end testing.',
        'Built reusable TypeScript utilities and helper functions to improve maintainability and reduce duplication.',
        'Worked with REST APIs for test data setup and backend validation to improve automation coverage.',
        'Integrated PDF report generation into the existing automation framework and collaborated through Git and Azure DevOps.',
      ],
    },
  ];
}
