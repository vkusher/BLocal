import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/switchMap';
import { User, Property, Picture } from '../_models/index';

import * as fdb from 'firebase'

import { environment } from '../../environments/environment';

@Injectable()
export class PropertyService {
  
  
  
  public Properties: Observable<Property[]> = this.getProperties();
  public propertyData: Observable<any>;

  constructor(private httpService: Http) { }

  getPropertyData(propId: string): any {
    return this.httpService.get(environment.apiurl + 'getproperty/' + propId).map(data=>data.json()); 
  };
  
  getProperties() {
    return this.httpService.get(environment.apiurl + 'getproperties').map(data => data.json());
 };

 voteForProperty(propId: string, uid: string): any {
  return this.httpService.get(environment.apiurl + 'voteforproperty/' + propId  + '/' + uid ).map(data => data.json());
 };
}
