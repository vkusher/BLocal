import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { PointOfInterest } from '../_models/index';

import * as fdb from 'firebase';

@Injectable()
export class PointOfInterestService {

  poiRef: AngularFirestoreCollection<PointOfInterest> = this.db.collection('pointsofinterest', ref => ref.where('isactive', '==', true));
  public PointsOfInterest: Observable<PointOfInterest[]> = this.poiRef.valueChanges();

  constructor(private db: AngularFirestore) { }

  getCategories(){

  }
  
  getPoisForCategory(categoryid:string){
    let poiRefByCat: AngularFirestoreCollection<PointOfInterest> = 
    this.db.collection('pointsofinterest', ref => ref.where('isactive', '==', true)
    .where("categoryid","==", categoryid)
    );

    return poiRefByCat.valueChanges();
  }

}