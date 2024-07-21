import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HttpInterceptorInterceptor } from './services/http-interceptor.interceptor';
import { LoaderComponent } from './components/loader/loader.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import {CdkDrag, CdkDropList, DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    LoaderComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    CdkDrag,
    CdkDropList
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : HttpInterceptorInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
