import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { AlertBoxComponent } from '../alertBox.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  showPassword : boolean = true;
  userLoginFormGroup!:FormGroup;
  
  constructor(private fb : FormBuilder,private commonService : CommonService,private router : Router,private alertService : AlertService,private authService : AuthService){}

  ngOnInit(): void {
      this.userLoginFormGroup = this.fb.group({
        emailAddress : [,[Validators.required,Validators.email]],
        password : [,[Validators.required]]
      });
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

  goToSignUpPage(){
    this.router.navigate(['/signup']);
  }
}
