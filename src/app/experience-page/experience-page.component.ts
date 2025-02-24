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
    'Collaborated with cross-functional teams to identify and resolve software defects, improving system stability and user experience.',
    'Got trained in MEAN Stack (MongoDB, Express.js, Angular, and Node.js) to expand expertise in full-stack development.',
    'Single-handedly developed a full-stack web application using the MEAN stack, implementing scalable backend services and an interactive frontend UI to streamline internal processes.',
    'Optimized API performance and database queries, ensuring efficient data retrieval and seamless user interactions.',
    'Integrated CI/CD pipelines to automate deployments, enhancing software release efficiency and reducing downtime.',
  ];

  setActiveContent(content: string) {
    this.activeContent = content;
  }
}
