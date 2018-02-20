import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/switchMap';
import { User, Property, Picture } from '../_models/index';
import {AppComponent} from '../app.component'

import * as fdb from 'firebase'

import { environment } from '../../environments/environment';

@Injectable()
export class PropertyService {
  
  
  
  //public Properties: Observable<Property[]> = this.getProperties();
  public propertyData: Observable<any>;

  constructor(private httpService: Http,private app: AppComponent) { }

  getPropertyData(propId: string): any {
    return this.httpService.get(environment.apiurl + 'getproperty/' + propId).map(data=>data.json()); 
  };

  getPropertyDataByAirBnB(propId: string): any {
    return this.httpService.get(environment.apiurl + 'getpropertybyairbnb/' + propId).map(data=>data.json()); 
  };
  
  getProperties(uid: string) {
    return this.httpService.get(environment.apiurl + 'getproperties/' + uid).map(data => data.json());
    
 };

 voteForProperty(propId: string, uid: string): any {
  return this.httpService.get(environment.apiurl + 'voteforproperty/' + propId  + '/' + uid ).map(data => data.json());
 };

 addNewProperty(propId: string, uid: string){
  return this.httpService.get(environment.apiurl + 'addnewproperty/' + propId + '/' + uid ).map(data => data.json());
 }

 sendRecommendation(propId: string, uid: string, msg: string){
  let payload = {
    PropertyId: propId,
    FireBaseId: uid,
    Message: msg
  };

  return this.httpService.post(environment.apiurl + 'sendrecommendation', payload).map(data => data.json());
 }
}
