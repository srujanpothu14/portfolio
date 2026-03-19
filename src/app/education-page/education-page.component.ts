import { Component } from '@angular/core';

@Component({
  selector: 'app-education-page',
  imports: [],
  templateUrl: './education-page.component.html',
  styleUrl: './education-page.component.scss',
})
export class EducationPageComponent {
  education = [
    {
      degree: 'B.Tech in Information Technology',
      institute: 'Malla Reddy Engineering College',
      score: 'CGPA: 8.01',
      duration: '2020 - 2024',
    },
    {
      degree: 'Class 12th',
      institute: 'SR Junior College',
      score: '96%',
      duration: '2018 - 2020',
    },
    {
      degree: 'Class X',
      institute: 'Little Flower High School',
      score: 'CGPA: 10.0',
      duration: '2018',
    },
  ];
}
