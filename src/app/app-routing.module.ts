import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherComponent } from './teacher/teacher.component';
import { GraphUnitComponent } from './teacher/graph-unit/graph-unit.component';
import { InfoUnitComponent } from './teacher/info-unit/info-unit.component';
import { ExerciseUnitComponent } from './teacher/exercise-unit/exercise-unit.component';
import { VideoUnitComponent } from './teacher/video-unit/video-unit.component';
import { InputDialogComponent } from './teacher/info-unit/input-dialog.component';
import { ChatExerciseComponent } from './shared/chat-exercise/chat-exercise.component';
import { InteractionComponent } from './student/lesson/interaction.component';
import { DraggableDirective } from './teacher/graph-unit/directives/draggable.directive';
import { GraphComponent } from './teacher/graph-unit/views/graph/graph.component';
import { LinkComponent } from './teacher/graph-unit/views/graph/link/link.component';
import { MessageComponent } from './shared/chat-exercise/message/message.component';
import { NodeComponent } from './teacher/graph-unit/views/graph/node/node.component';
import { UnitsNotRelatedComponent } from './teacher/graph-unit/views/units-not-related/units-not-related.component';
import { ZoomableDirective } from './teacher/graph-unit/directives/zoomable.directive';
import { SessionComponent } from './teacher/info-unit/sessions/session.component';
import { LessonComponent } from './teacher/info-unit/lessons/lesson.component';
import { VideoStudentComponent } from './student/lesson/video/video.component';
import { StudentComponent } from './student/student.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: TeacherComponent.URL },
  { path: TeacherComponent.URL, component: TeacherComponent },
  { path: StudentComponent.URL, component: StudentComponent },
  { path: InteractionComponent.URL, component: InteractionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  static COMPONENTS = [
    ChatExerciseComponent,
    DraggableDirective,
    ExerciseUnitComponent,
    GraphComponent,
    GraphUnitComponent,
    InfoUnitComponent,
    InteractionComponent,
    LessonComponent,
    LinkComponent,
    MessageComponent,
    NodeComponent,
    SessionComponent,
    StudentComponent,
    TeacherComponent,
    UnitsNotRelatedComponent,
    VideoUnitComponent,
    VideoStudentComponent,
    ZoomableDirective,
  ];

  static DIALOGS_COMPONENTS = [
    InputDialogComponent
  ];
}
