import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User, Property, Picture } from '../_models/index';


@Injectable()
export class PropertyService {

  propertiesRef: AngularFirestoreCollection<Property> = this.db.collection('properties')
  public Properties: Observable<Property[]> = this.propertiesRef.valueChanges();

  constructor(private db: AngularFirestore) { }

  

}
