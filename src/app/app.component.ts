import { Component } from '@angular/core';
import {TeacherComponent} from './teacher/teacher.component';
import {Router} from '@angular/router';
import {StudentComponent} from './student/student.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {
  }

  teacher() {
    this.router.navigate([TeacherComponent.URL]);
    this.stylesTeacher('teacher');
    this.stylesStudent('student');
  }

  student() {
    this.router.navigate([StudentComponent.URL]);
    this.stylesTeacher('student');
    this.stylesStudent('teacher');
  }

  stylesTeacher(name: string) {
    document.getElementById(name).style.color = 'black';
    document.getElementById(name).style.background = 'bisque';
  }
  stylesStudent(name: string) {
    document.getElementById(name).style.color = 'white';
    document.getElementById(name).style.background = 'bottom';
  }
}
