import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { HttpService } from 'src/app/core/http/http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
showOtpInput:boolean=false;
otpVerified:boolean=false;
otpMatchFailed:boolean=false;
signUpForm!:FormGroup;
Generatedotp!:number;
otpTimer!:number;
signUpSuccess:boolean=false;
sub!:Subscription

  constructor(private fb:FormBuilder, private svc:HttpService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.signUpForm=this.fb.group({
      'username':['',[Validators.required]],
      'mobile':['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      'password':['',[Validators.required]],
      'mobileNoVerified':['false',[]]
    })
  }



  signUp(){
    if(this.otpVerified==true){
      this.svc.postUserDetailsToServer('users',this.signUpForm.value).subscribe((Response:any)=>{
        if(Response){
          this.signUpSuccess=true;
          console.log(Response);
          console.log("success");
        }
      })

    }
  }
  

  sendOtp(){
    this.showOtpInput=true;
    this.Generatedotp=Math.floor(1000 + Math.random() * 9000);
    alert("Your otp is "+this.Generatedotp);

    const emittedNo=interval(1000);
    this.sub=emittedNo.subscribe((val:any)=>{
      this.otpTimer=60-val;
      if(this.otpTimer==0){
        this.sub.unsubscribe();
        this.showOtpInput=false;
      }
    })
}

verifyOtp(userOtp:string){
if(Number(userOtp)==this.Generatedotp){
  this.sub.unsubscribe();
this.otpVerified=true;
this.showOtpInput=false;
this.signUpForm.controls['mobileNoVerified'].setValue(true);
}
else{
  this.otpMatchFailed=true;
}
}

mobNoChanged(){
  this.otpVerified=false;
}
}