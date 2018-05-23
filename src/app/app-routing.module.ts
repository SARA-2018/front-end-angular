import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { TeacherComponent } from './teacher/teacher.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: HomeComponent.URL },
  { path: HomeComponent.URL, component: HomeComponent },
  { path: TeacherComponent.URL, component: TeacherComponent ,
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
    // Declaracion de COMPONENTES
    HomeComponent,
    TeacherComponent
  ];

  static DIALOGS_COMPONENTS = [
    // Declaracion de DIALOGOS
  ];
}
