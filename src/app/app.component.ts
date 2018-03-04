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
  public user$: Observable<fb.User> = new Observable();
  public userDetails: fb.User = null;
  

  constructor(private afAuth: AngularFireAuth, private router: Router){
    afAuth.auth.onAuthStateChanged( user =>{
      if (user) {
        localStorage.setItem("blocaluserid", user.uid);
          this.userDetails = user;          
      } else {          
          this.userDetails = null;    
          localStorage.removeItem("blocaluserid");      
          this.router.navigate(['/login']);
      }
  
    });   

  }

  getCurrentUserId(): string {
    return localStorage.getItem("blocaluserid") ? localStorage.getItem("blocaluserid") : '0x0';
  }

  showLoading(show: boolean): void{
    document.getElementById("loading").style.display = show ? 'block' : 'none';
    document.getElementById("loading").style.zIndex = show ? '100' : '-1';
  }
}
