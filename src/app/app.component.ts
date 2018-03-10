import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { Http, RequestOptionsArgs} from '@angular/http';
//import { UserService} from './_services/index'

import * as fb from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public user$: Observable<fb.User> = new Observable();
  public userDetails: fb.User = null;
  

  constructor(private afAuth: AngularFireAuth, private router: Router,private httpService: Http){
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

    let uid = this.getCurrentUserId();
    this.saveCurrentLocation(uid);

  }

  getCurrentUserId(): string {
    return localStorage.getItem("blocaluserid") ? localStorage.getItem("blocaluserid") : '0x0';
  }

  showLoading(show: boolean): void{
    document.getElementById("loading").style.display = show ? 'block' : 'none';
    document.getElementById("loading").style.zIndex = show ? '100' : '-1';
  }

  saveCurrentLocation(userid:string): void{

    console.log(userid);

    if(!!navigator.geolocation) {
      let pos = navigator.geolocation.getCurrentPosition(t=>{
          let latitude = t.coords.latitude;
          let longitude = t.coords.longitude;
          
          let postData = {
            FireBaseId: userid,
            Latitude: latitude,
            Longitude: longitude
          };

          console.log(environment.apiurl);
        this.httpService.post( environment.apiurl + 'setuserlocation', postData ).subscribe(data=> console.log(data) );

      }); 
    }     
  }
}
