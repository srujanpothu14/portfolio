import { Component } from '@angular/core';

@Component({
  selector: 'app-certifications-page',
  imports: [],
  templateUrl: './certifications-page.component.html',
  styleUrl: './certifications-page.component.scss',
})
export class CertificationsPageComponent {
  certifications = [
    'Microsoft Certified Azure Fundamentals',
    'Ineuron Full Stack Java Development',
    'Path Creators Full Stack Development Internship',
    'NPTEL Programming in Java',
  ];
}
