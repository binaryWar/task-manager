import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { AlertBoxComponent } from '../alertBox.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { filter } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  showPassword : boolean = true;
  userLoginFormGroup!:FormGroup;
  
  constructor(private fb : FormBuilder,private commonService : CommonService,private router : Router,private alertService : AlertService,private authService : AuthService, private socialAuthService: SocialAuthService ){}

  ngOnInit(): void {
      this.userLoginFormGroup = this.fb.group({
        emailAddress : [,[Validators.required,Validators.email]],
        password : [,[Validators.required]]
      });
      this.handleLogInWithGoogle();
  }

  onLogin(){

    if(this.userLoginFormGroup.invalid){
      this.alertService.show("Fill Email and password to continue");
      return;
    }
    this.commonService.login(this.userLoginFormGroup.value).subscribe({
      next : (data:any)=>{
        const {token} = data;
        this.authService.setToken(token);
        this.router.navigateByUrl('/tasks');
      },error : (err:any)=>{
        this.alertService.show(err.error.message || "Something went wrong");
      }
    })
  }
  private handleLogInWithGoogle(){
    this.socialAuthService.authState.pipe(
      filter(result=>!!result)
    ).subscribe(result=>{
      const {idToken,provider} = result;
      const payload = {
        idToken,
        provider
      } 
      this.verifyToken(payload);
    })
  }

  goToSignUpPage(){
    this.router.navigate(['/signup']);
  }

  private verifyToken(payload : {idToken :string,provider : string}){
    this.authService.verifyGoogleToken(payload).subscribe({
      next : (response:any)=>{
        const {token} = response;
        this.authService.setToken(token);
        this.router.navigateByUrl('/tasks');
      },error : (err:any)=>{
        this.alertService.show(err.error.message || "Please Try again later!!!");
      }
    })
  }
}
