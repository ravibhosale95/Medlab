import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
categories:any;
  constructor(private svc:HttpService) { }

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories(){
    // const httpParams: HttpParams = new HttpParams()
    // .set('pincode', this.pincode);
    this.svc.getCategoriesFromServer('top-deals-by-category ').subscribe({
      next: (response:any) => {
        if(response && response.length){
          this.categories=response;
        }
      },
      error: (e) => {
        console.error(e);
      }
      //complete: () => console.info('complete') 
    })
  }
}
