import { Component } from '@angular/core';

@Component({
  selector: 'app-skills-page',
  imports: [],
  templateUrl: './skills-page.component.html',
  styleUrl: './skills-page.component.scss',
})
export class SkillsPageComponent {
  skills = [
    { name: 'Angular', logo: 'assets/angular_logo.svg' },
    { name: 'React' },
    { name: 'TypeScript', logo: 'assets/typescript_logo.svg' },
    { name: 'JavaScript', logo: 'assets/javascript_logo.svg' },
    { name: 'Java', logo: 'assets/java_logo.svg' },
    { name: 'C#', logo: 'assets/csharp_logo.svg' },
    { name: 'C' },
    { name: 'SQL' },
    { name: 'Node.js', logo: 'assets/nodejs_logo.svg' },
    { name: 'Express.js', logo: 'assets/express_logo.png' },
    { name: 'HTML', logo: 'assets/html_logo.svg' },
    { name: 'CSS', logo: 'assets/css_logo.svg' },
    { name: 'MongoDB' },
    { name: 'MySQL' },
    { name: 'MS SQL Server' },
    { name: 'DynamoDB', logo: 'assets/dynamodb_logo.svg' },
    { name: 'AWS' },
    { name: 'Azure DevOps' },
    { name: 'Playwright' },
    { name: 'Selenium', logo: 'assets/selenium_logo.svg' },
    { name: 'BDD' },
  ];
}
