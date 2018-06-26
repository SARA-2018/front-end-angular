import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { GraphUnitComponent } from './teacher/graph-unit/graph-unit.component';
import { InfoUnitComponent } from './teacher/info-unit/info-unit.component';
import { ExerciseUnitComponent } from './teacher/exercise-unit/exercise-unit.component';
import { VideoUnitComponent } from './teacher/video-unit/video-unit.component';
import { InputDialogComponent } from './teacher/info-unit/input-dialog.component';
import { ChatExerciseComponent } from './teacher/exercise-unit/chat-exercise/chat-exercise.component';
import { FormationComponent } from './student/iteracion/formation.component';
import { LessonComponent } from './student/lesson/lesson.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: TeacherComponent.URL },
  { path: TeacherComponent.URL, component: TeacherComponent },
  { path: StudentComponent.URL, component: StudentComponent },
  { path: LessonComponent.URL, component: LessonComponent,
    children: [
      // Declaracion de RUTAS
     //  { path: VideoComponent.URL, component: VideoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  static COMPONENTS = [
    ChatExerciseComponent,
    ExerciseUnitComponent,
    GraphUnitComponent,
    InfoUnitComponent,
    StudentComponent,
    TeacherComponent,
    VideoUnitComponent,
    FormationComponent,
    LessonComponent
  ];

  static DIALOGS_COMPONENTS = [
    // Declaracion de DIALOGOS
    InputDialogComponent
  ];
}
