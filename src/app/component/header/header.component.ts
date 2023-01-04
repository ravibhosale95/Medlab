import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticatonService } from 'src/app/core/authentication/authenticaton.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
loginToggle:boolean=false;
currentPage:any="Login";
loggedUserDetails!:any;
loginSuccess:boolean=false;

@ViewChild('closeBtn',{read:ElementRef}) 
closeBtn!:ElementRef

  constructor(private auth:AuthenticatonService) { }

  ngOnInit(): void {
    if(this.auth.getTokenFromLocal()!=null){
      this.loggedUserDetails=this.auth.getUserFromLocal();
      this.loginSuccess=true;
    }
  }

  toggleCurrentPage(val: any) {
    this.currentPage=val;
  }

  handleModal(flag:boolean){
if(flag==true){
  this.loginSuccess=true;
  this.closeBtn.nativeElement.click();
}
  }
}
