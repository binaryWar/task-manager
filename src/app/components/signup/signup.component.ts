import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  userRegistrationForm!:FormGroup;

  constructor(private formBuilder : FormBuilder,private commonService : CommonService,private router : Router){
    this.createForm();
  }

  private createForm(): void {
    
    this.userRegistrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.maxLength(15)]],
      emailAddress: ['', [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.maxLength(15), Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator // Custom validator for password confirmation
    });
  }
  private passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
  
    if (!password || !confirmPassword || password.value === confirmPassword.value) {
      return null;
    }
  
    return { 'passwordMismatch': true };
  }

  get f() { return this.userRegistrationForm.controls; }

  onSubmit(){
    if(this.userRegistrationForm.invalid){
      if(this.userRegistrationForm.errors?.['passwordMismatch']){
        alert("Password and confirm password is not matching")
        return;
      }
      alert("Fill all mandatory fields to continue");
      return;
    }
    const {firstName,lastName,emailAddress,password } = this.userRegistrationForm.value;
    const payload = {
      firstName,
      lastName,
      emailAddress,
      password
    }
    this.commonService.registerUser(payload).subscribe({
      next : (response : any)=>{
        alert(response.message);
        this.saveCredentials(response);
        this.router.navigate(['/tasks']);
      },error : (err:any)=>{
        alert("some thing went wrong");
      }
    })
  }

  clickOnLogin(){
    this.router.navigate(['/login']);
  }

  private saveCredentials(response : any){
    const { emailAddress,id } = response;
    const credentials = {
      id,
      emailAddress
    }
    sessionStorage.setItem("task-item", JSON.stringify(credentials));  
  }
}
