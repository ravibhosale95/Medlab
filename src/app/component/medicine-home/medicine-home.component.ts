import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpService } from 'src/app/core/http/http.service';

@Component({
  selector: 'app-medicine-home',
  templateUrl: './medicine-home.component.html',
  styleUrls: ['./medicine-home.component.scss']
})
export class MedicineHomeComponent implements OnInit {
TopDeals!:any;

  pincode:string="";
  pinValid:boolean=false;
  show:boolean=false;
  pincodeDetails:any;
  @ViewChild('closeBtn',{read:ElementRef}) closeBtn!:ElementRef

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  constructor(private svc:HttpService) { }

  ngOnInit(): void {
    this.getTopDeals();
  }

  validatePinCode(){
    console.log("validate pincode called");
    this.pinValid=false;
    this.show=false;

    if(this.pincode.length==6){
      const httpParams: HttpParams = new HttpParams()
      .set('pincode', this.pincode);
      this.svc.getDetailsFromServer("pincodeDetails",httpParams).subscribe((response:any)=>{
        if(response && response.length>0){
          this.pinValid=true;
          this.show=true;
          this.pincodeDetails=response[0];

          if (this.closeBtn) {
            //close modal automically
            //this.closeBtn.nativeElement.click();
          }
        }
        else{
          this.pinValid=false;
          this.show=true;
        }
      },
        (error:any)=>{
          console.log(error);
        }
      )
    }
  }

  submit(){

    if (this.closeBtn) {
      //close modal automically
      this.closeBtn.nativeElement.click();
    }
  }

  getTopDeals(){
this.svc.geTopDealsFromServer("medicineDetails").subscribe({
  next: (response) => {
    this.TopDeals=response;
  },
  error: (e) => {
    console.error(e);
  }
  //complete: () => console.info('complete') 
})
  }
}
