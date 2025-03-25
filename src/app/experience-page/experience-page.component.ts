import { Component } from '@angular/core';

@Component({
  selector: 'app-experience-page',
  imports: [],
  templateUrl: './experience-page.component.html',
  styleUrl: './experience-page.component.scss',
})
export class ExperiencePageComponent {
  activeContent: string = 'proclink'; // Default Content
  proclink_experience: string[] = [
    'Developed and executed automated test scripts using Selenium and C# to ensure the reliability and efficiency of web applications, improving test coverage and reducing manual effort.',
    'Designed and maintained a robust test automation framework, streamlining the testing process and enhancing overall software quality.',
    'Designed and developed pdf generation feature for the application using iTextSharp and Oxyplot libraries in C# to generate test reports.',
    'Got trained in MEAN Stack (MongoDB, Express.js, Angular, and Node.js) to expand expertise in full-stack development.',
    'Single-handedly developed a full-stack web application using the MEAN stack, implementing scalable backend services and an interactive frontend UI to streamline internal processes.',
    'Optimized API performance and database queries, ensuring efficient data retrieval and seamless user interactions.',
  ];

  setActiveContent(content: string) {
    this.activeContent = content;
  }
}
