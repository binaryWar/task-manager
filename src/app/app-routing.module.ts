import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { TaskListComponent } from './components/task-list/task-list.component';

const routes: Routes = [
  {path : "", component : LoginComponent , pathMatch : 'full'},
  {path : "tasklist", component : TaskListComponent , pathMatch : 'full'},
  {path : '**', component : LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
