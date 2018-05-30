import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { TeacherComponent } from '../teacher/teacher.component';


@Component({
  templateUrl: 'student.component.html',
  styleUrls: ['student.component.css']
})

export class StudentComponent {

  static URL = 'student';

  constructor( private router: Router) { }

  teacher() {
    this.router.navigate([TeacherComponent.URL]);
  }
}
