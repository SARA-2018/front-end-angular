import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { CancelYesDialogComponent } from './core/cancel-yes-dialog.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: TeacherComponent.URL },
  { path: HomeComponent.URL, component: HomeComponent },
  { path: TeacherComponent.URL, component: TeacherComponent},
  { path: StudentComponent.URL, component: StudentComponent,
    children: [
      // Declaracion de RUTAS
      // { path: TeacherComponent.URL, component: TeacherComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  static COMPONENTS = [
    HomeComponent,
    TeacherComponent,
    StudentComponent
  ];

  static DIALOGS_COMPONENTS = [
    // Declaracion de DIALOGOS
    CancelYesDialogComponent
  ];
}
