import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  activeBtn : string = "signupBtn";
  showPassword : boolean = true;
  userLoginFormGroup!:FormGroup;
  
  constructor(private fb : FormBuilder,private commonService : CommonService,private router : Router){

  }
  ngOnInit(): void {
      this.userLoginFormGroup = this.fb.group({
        emailAddress : [,[Validators.required,Validators.email]],
        password : [,[Validators.required]]
      });
  }
  onSignUpClick(event:any){ 
    this.activeBtn = "signupBtn";
  }
  onLoginClick(event:any){
    this.activeBtn = "loginBtn";
  }
  onLogin(){
    if(this.userLoginFormGroup.invalid){
      alert("Fill the details");
      return;
    }
    this.commonService.login(this.userLoginFormGroup.value).subscribe({
      next : (data:any)=>{
        const {httpStatusCode,id,emailAddress} = data;
        this.handleSessionStorage(id,emailAddress);
        this.router.navigate(['/incident'])
      },error : (err:any)=>{
        alert("Invalid credentials");
      }
    })
  }
  private handleSessionStorage(id:string , emailAddress : string){
    this.commonService.setLoggedInUserId(id);
    this.commonService.setLoggedInUserEmailAddress(emailAddress);
    const crednetials = {
      id,
      emailAddress
    }
    sessionStorage.setItem("credentials",JSON.stringify(crednetials));
  }
  setButtonValue(event:string){
    this.activeBtn = event;
  }
}
