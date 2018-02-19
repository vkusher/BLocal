import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Category } from '../_models/index';
import { environment } from '../../environments/environment';

import * as fdb from 'firebase';

@Injectable()
export class CategoriesService {
  
  public Categories: Observable<Category[]> = this.getCategories();

  constructor(private httpService: Http) { }

  getCategoryData(categoryid:string){

    return this.httpService.get(environment.apiurl + 'getcategory/' + categoryid).map(data=>data.json());
  } 
  
  getCategories() {
    return this.httpService.get( environment.apiurl + 'getcategories').map(data => data.json());
  }

  getCategoriesForProperty(propertyid:string) {
    return this.httpService.get( environment.apiurl + 'getcategorieforproperty/' + propertyid ).map(data => data.json());
  }
}