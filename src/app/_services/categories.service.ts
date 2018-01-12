import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Category } from '../_models/index';

import * as fdb from 'firebase';

@Injectable()
export class CategoriesService {

  categoriesRef: AngularFirestoreCollection<Category> = this.db.collection('categories', ref => ref.where('isactive', '==', true));
  public Categories: Observable<Category[]> = this.categoriesRef.valueChanges();

  constructor(private db: AngularFirestore) { }

  getCategories(){

  }
  

}