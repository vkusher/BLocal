import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

import * as fb from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public user: Observable<fb.User>;
  public userDetails: fb.User = null;
  

  constructor(private afAuth: AngularFireAuth, private router: Router){
    afAuth.auth.onAuthStateChanged( user =>{
      if (user) {
          this.userDetails = user;
      } else {
          
          this.userDetails = null;
      }


      if (user) {
        this.userDetails = user;
    } else {
        
        this.userDetails = null;
    }
  
    });

    

  }
}
