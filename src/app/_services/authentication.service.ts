import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../_services/user.service';

import {AppComponent} from '../app.component'

import * as fb from 'firebase';

@Injectable()
export class AuthenticationService {    

    constructor(public app: AppComponent, private fauth: AngularFireAuth, private userSrvc: UserService) {         
          
    }

    isLoggedIn() {
        if (this.app.userDetails == null ) {
            return false;
        } else {
            return true;
        }
    }

    registerNewUser(user: string, pass: string){
        return this.fauth.auth.createUserWithEmailAndPassword(user, pass);
    }

    loginWithFacebook() {        
        let provider = new fb.auth.FacebookAuthProvider();                      
        provider.addScope('email');
        provider.addScope('public_profile');
        provider.setCustomParameters({
            'display': 'popup'
        });

        return fb.auth().signInWithPopup(provider);       

    }


    login(username: string, password: string) {
        return this.fauth.auth.signInWithEmailAndPassword(username, password);
    }

    loginguest(propertyid: string){
        //return this.userSrvc.getUserByProperty(propertyid);
        return this.fauth.auth.signInAnonymously();
    }

    logout() {
        return this.fauth.auth.signOut();
    }
}