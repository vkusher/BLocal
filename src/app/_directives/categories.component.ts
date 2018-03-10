import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CategoriesService } from '../_services/index';
import { Category } from '../_models/index';
import { AppComponent  } from '../app.component';



@Component({
  moduleId: module.id,
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input() propertyid: string;

  private catSubscription: Subscription;
  public categories: Category[] = [];

  constructor(private catService: CategoriesService, private app: AppComponent) {
    if(!this.propertyid){
      this.propertyid = "0";
    }
   }

  ngOnInit() {
    if(this.propertyid && this.propertyid != "0"){
      this.catSubscription = this.catService.getCategoriesForProperty(this.propertyid).subscribe(data => {  this.categories = data; });
    }
    else{
      let uid = this.app.getCurrentUserId();
      this.catSubscription = this.catService.getCategories(uid).subscribe(data => { this.categories = data; });
    }
    
  }

  ngOnDestroy(): void {    
    this.catSubscription.unsubscribe();
  }
}
