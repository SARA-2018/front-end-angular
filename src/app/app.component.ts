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
  }

  student() {
    this.router.navigate([StudentComponent.URL]);
  }
}
