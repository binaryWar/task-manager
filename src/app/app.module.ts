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
import { AlertService } from './services/alert.service';
import { AlertBoxComponent } from './components/alertBox.component';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    LoaderComponent,
    TaskListComponent,
    AlertBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    CdkDrag,
    CdkDropList,
    SocialLoginModule,
    GoogleSigninButtonModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : HttpInterceptorInterceptor, multi:true},
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        lang: 'en',
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '598027431043-ufr8mpvkoi25qkt9hnkvq17rvr4b3dhg.apps.googleusercontent.com',
              {
                oneTapEnabled : false,
                prompt : "consent"
              })
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
