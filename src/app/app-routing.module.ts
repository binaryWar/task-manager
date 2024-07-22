import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { SignupComponent } from './components/signup/signup.component';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
  {path : "login", component : LoginComponent , pathMatch : 'full', canActivate : [authGuard]},
  {path : "signup", component : SignupComponent , pathMatch : 'full', canActivate : [authGuard]},
  {path : "tasks", component : TaskListComponent , pathMatch : 'full', canActivate : [authGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
