import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  userRegistrationForm!:FormGroup;
  @Output() loginClick : EventEmitter<string> = new EventEmitter<string>();

  constructor(private formBuilder : FormBuilder,private commonService : CommonService){
    this.createForm();
  }

  private createForm(): void {
    
    this.userRegistrationForm = this.formBuilder.group({
      userType: ['', Validators.required],
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
      alert("Fill all mandatory fields to contine");
      return;
    }
    const payloadBody = this.userRegistrationForm.value;
    this.commonService.registerUser(payloadBody).subscribe({
      next : (response : any)=>{
        alert("Creation success");
      },error : (err:any)=>{
        alert("some thing went wrong");
      }
    })
  }
  clickOnLogin(){
    this.loginClick.emit("loginBtn")
  }
}
