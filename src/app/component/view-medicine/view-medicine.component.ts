import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/core/http/http.service';

@Component({
  selector: 'app-view-medicine',
  templateUrl: './view-medicine.component.html',
  styleUrls: ['./view-medicine.component.scss']
})
export class ViewMedicineComponent implements OnInit {
  drugCode!:string | null;
  drugDetails:drugDetails[]=[];
  drugDeatailsLoaded:Boolean=false;
  constructor(private svc:HttpService, private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.drugCode=this.activeRoute.snapshot.paramMap.get('drugCode');
    this.loadMedicine(this.drugCode);
  }

loadMedicine(drugCode:string|null){
if(drugCode!=null){
  const httpParams: HttpParams = new HttpParams()
  .set('drugCode',drugCode);
  this.svc.getMedicineFromServer("medicineDetails",httpParams).subscribe(
    {
      next:(response:any)=>{
        if(response && response.length>0){
          this.drugDetails=response; 
          console.log(this.drugDetails);
          this.drugDeatailsLoaded=true;
        }
     },
      error: (e) => {
        console.error(e);
      }
      //complete: () => console.info('complete') 

    }
  )
}
}

}

export interface drugDetails
  {
      "drugCode": any,
      "actualPrice":any,
      "maxQuantity": any,
      "discountPrice": any,
      "description": any,
      "availability": any,
      "source":  any,
      "type":  any,
      "isActive":  any,
      "descriptionString":  any,
      "discountPercentage":  any,
      "productImageSlug": any[],
      "composition":  any,
      "medicineType":  any,
      "userLimit":  any,
      "brand":  any,
      "medicineCategory":  any,
      "medicineTag":  any[],
      "productDetailSlug":  any,
      "isOtc":  any,
      "genericDosage":  any,
      "drugForm":  any,
      "searchable":  any,
      "medicineName":  any,
      "schedule":  any,
      "size":  any,
      "rxRequired":  any,
      "name":  any,
      "adjudicationFlag":  any,
      "categoryId":  any,
      "discountPercentageText":  any,
      "showAdjudicationFlag":  any,
      "adjudicationText":  any,
  }
