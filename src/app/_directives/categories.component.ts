import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CategoriesService } from '../_services/index';
import { Category } from '../_models/index';



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

  constructor(private catService: CategoriesService) { }

  ngOnInit() {
    if(this.propertyid){
      this.catSubscription = this.catService.getCategoriesForProperty(this.propertyid).subscribe(data => {  this.categories = data; });
    }
    else{
      this.catSubscription = this.catService.Categories.subscribe(data => { this.categories = data; });
    }
    
  }

  ngOnDestroy(): void {    
    this.catSubscription.unsubscribe();
  }
}
