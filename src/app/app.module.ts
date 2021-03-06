import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';

import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { routing }        from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { customHttpProvider } from './_helpers/index';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';


import { AlertService, AuthenticationService, UserService, PropertyService, 
    CategoriesService, PointOfInterestService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';

import { FacebookModule } from 'ngx-facebook';
import { LinksComponent } from './links/links.component';
import { PropertyComponent } from './property/property.component';
import { CategoryComponent} from './category/category.component'
import { CategoriesComponent, CategoryDataComponent, PoiComponent, PeopleAroundComponent  } from './_directives/index';
import { AroundComponent } from './around/around.component';
import { RecommendComponent } from './recommend/recommend.component';
import { PersonalComponent } from './personal/personal.component';

import { MatRadioModule , MatSlideToggleModule} from '@angular/material';

import { ImageUploadModule } from "angular2-image-upload";

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export const firebaseConfig = {
    apiKey: "AIzaSyBgiDyyScVcEXk8Hfc6B7k9gLopYLEx8XA",
    authDomain: "blocal-191611.firebaseapp.com",
    databaseURL: "https://blocal-191611.firebaseio.com",
    projectId: "blocal-191611",
    storageBucket: "blocal-191611.appspot.com",
    messagingSenderId: "391571977147"
}

@NgModule({
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      routing,
      FacebookModule.forRoot(),
      AngularFireModule.initializeApp(firebaseConfig),      
      AngularFirestoreModule,
      AngularFireModule,
      AngularFireDatabaseModule,
      AngularFireAuthModule,
      MatSlideToggleModule,
      MatRadioModule,
      ImageUploadModule.forRoot()
  ],
  declarations: [
      AppComponent,
      AlertComponent,
      HomeComponent,
      LoginComponent,
      RegisterComponent,
      LinksComponent,
      PropertyComponent,
      CategoriesComponent,
      CategoryComponent,
      PoiComponent,
      CategoryDataComponent,
      AroundComponent,
      PeopleAroundComponent,
      RecommendComponent,
      PersonalComponent
  ],
  providers: [
    customHttpProvider,
      AuthGuard,
      AlertService,
      AuthenticationService,
      UserService,
      PropertyService,
      AppComponent,
      CategoriesService,
      PointOfInterestService,
      {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }