import { Component, OnInit, OnDestroy } from '@angular/core';
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
  private catSubscription: Subscription;
  public categories: Category[] = [];

  constructor(private catService: CategoriesService) { }

  ngOnInit() {
    this.catSubscription = this.catService.Categories.subscribe(data => { this.categories = data; });
  }

  ngOnDestroy(): void {    
    this.catSubscription.unsubscribe();
  }
}
