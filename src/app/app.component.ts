import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private afAuth: AngularFireAuth, private router: Router){
    let user = afAuth.auth.currentUser;
    let url = this.router.url;
    if(url.toLowerCase() != '/login' && url.toLowerCase() != '/register'){
      if (user) {
        // User is signed in.
      } else {
        this.router.navigate(['/login']);
      }
    }
    
  }
}
