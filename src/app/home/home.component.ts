import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { TeacherComponent } from '../teacher/teacher.component';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent {

  static URL = 'home';

  constructor( private router: Router) { }

  teacher() {
    this.router.navigate([TeacherComponent.URL]);
  }
}
