import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/switchMap';
import { User, Property, Picture } from '../_models/index';

import * as fdb from 'firebase'
import { async } from '@angular/core/testing';

@Injectable()
export class PropertyService {
  
  propertiesRef: AngularFirestoreCollection<Property> = this.db.collection('properties');
  public Properties: Observable<Property[]> = this.propertiesRef.valueChanges();
  public propertyData: Observable<any>;

  constructor(private db: AngularFirestore) { }

  getPropertyData(propId: string): any {

    let db = this.db;

    return new Promise(function(resolve, reject){

      let data = [];   
      db.collection('properties').ref.where('_id', '==', propId)
      .get().then(
        snap =>{
  
          snap.forEach((doc)=> {
            var d = doc.data();      
    
            db.collection("owners").ref.where("_id", "==", d.ownerid).get().then(x=> {
              d.user = x.docs[0].data();
              data.push(d);
              resolve(data);
            });
    
          });
  
          
        }
      );

    });
    
   
  }
  
}
