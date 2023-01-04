import { HttpParams } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../core/http/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  loginSuccess:boolean=false;
  loginFailed:boolean=false;
  showPassword:boolean=false;
  type:string="password";
  @Output()
  loginEvent: EventEmitter<any> = new EventEmitter();

  constructor(private fb:FormBuilder, private svc:HttpService) { 
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.loginForm=this.fb.group({
      'mobile':['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      'password':['',[Validators.required]]
    })
  }


  login(){
    const params:HttpParams=new HttpParams()
    .set('mobille',this.loginForm.controls['mobile'].value)
    .set('password',this.loginForm.controls['password'].value)

    this.svc.getDetailsFromServer('users',params).subscribe({
      next:(response:any)=>{
        if(response && response.length>0){
          var user=response[0];
          const token="user12345";
          user['authToken']=token;
          localStorage.setItem('authToken',token);
          localStorage.setItem('user',JSON.stringify(user));
          
          this.loginSuccess=true;
          this.loginFailed=false;
          this.clear();
          this.loginEvent.emit(this.loginSuccess);
        }
        else{
          this.loginFailed=true;
        }
      }
    })
  }

  passToggle(){
    this.showPassword=!(this.showPassword);
    if(this.showPassword==true){
      this.type="text";
    }
    else{
      this.type="password";
    }
  }

  clear(){
    this.loginForm.controls['mobile'].setValue('');
    this.loginForm.controls['password'].setValue('');
  }
}
