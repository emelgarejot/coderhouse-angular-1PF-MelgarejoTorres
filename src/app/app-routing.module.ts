import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './core/components/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },

  {
    path: 'alumnos',
    loadChildren: () =>
      import('./pages/student/student.module').then(
        (module) => module.StudentModule
      ),
  },
  {
    path: 'cursos',
    loadChildren: () =>
      import('./pages/course/course.module').then(
        (module) => module.CourseModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
