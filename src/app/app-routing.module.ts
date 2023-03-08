import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './core/components/welcome/welcome.component';
import { SessionGuard } from './core/guards/session.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [SessionGuard],

    component: WelcomeComponent,
  },

  {
    path: 'auth',

    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
  },

  {
    path: 'alumnos',
    canActivateChild: [SessionGuard],
    loadChildren: () =>
      import('./pages/student/student.module').then(
        (module) => module.StudentModule
      ),
  },
  {
    path: 'cursos',
    canActivateChild: [SessionGuard],
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
