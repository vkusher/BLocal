import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { PointOfInterest } from '../_models/index';
import { environment } from '../../environments/environment';

import * as fdb from 'firebase';

@Injectable()
export class PointOfInterestService {

  public PointsOfInterest: Observable<PointOfInterest[]> = this.getPoIs();

  constructor(private httpService: Http) { }

  getCategories(){

  }
  
  getPoisForCategory(categoryid:string, propertyid: string, uid: string){
    
    return this.httpService.get(environment.apiurl + 'getpoisforcategory/' + categoryid + '/' + propertyid + '/' + uid).map((res) => res.json());
  }

  getPoIs(){
    return this.httpService.get(environment.apiurl + 'getpois').map((res) => res.json());
  }

}