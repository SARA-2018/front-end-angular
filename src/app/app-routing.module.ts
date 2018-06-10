import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { CancelYesDialogComponent } from './core/cancel-yes-dialog.component';
import { GraphUnitComponent } from './teacher/graph-unit/graph-unit.component';
import { InfoUnitComponent } from './teacher/info-unit/info-unit.component';
import { ExerciseUnitComponent } from './teacher/exercise-unit/exercise-unit.component';
import { VideoUnitComponent } from './teacher/video-unit/video-unit.component';
import { InputDialogComponent } from './teacher/info-unit/input-dialog.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: TeacherComponent.URL },
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
    TeacherComponent,
    StudentComponent,
    GraphUnitComponent,
    InfoUnitComponent,
    ExerciseUnitComponent,
    VideoUnitComponent
  ];

  static DIALOGS_COMPONENTS = [
    // Declaracion de DIALOGOS
    CancelYesDialogComponent,
    InputDialogComponent
  ];
}
