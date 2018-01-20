import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { CategoriesService } from '../_services/index';
import { Category } from '../_models/index';

@Component({
  moduleId: module.id,
  selector: 'app-categorydata',
  templateUrl: './categorydata.component.html',
  styleUrls: ['./categorydata.component.css']
})
export class CategoryDataComponent implements OnInit, OnDestroy {
  private catSubscription: Subscription;
  private routeSubscription: Subscription;
  private catId: string;
  private categoryData: any;

  constructor(private route: ActivatedRoute,private catService: CategoriesService) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
        this.catId = params["categoryid"];
    });
    this.catSubscription = this.catService.getCategoryData(this.catId).subscribe(data => { 
      this.categoryData = data[0];
  });
  }

  ngOnDestroy(): void {    
    this.catSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}
