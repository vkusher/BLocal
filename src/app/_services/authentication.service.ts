import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { FacebookService, InitParams, LoginResponse  } from 'ngx-facebook';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private fb: FacebookService) { 
        
    let initParams: InitParams = {
        appId: '414359645650112',
        xfbml: true,
        version: 'v2.11'
      };
   
      fb.init(initParams);
    }

    loginWithFacebook() {
        
           return this.fb.login({scope: 'email,public_profile',return_scopes: true});            
        
    }

    createFacebookUser(user) : void{

        this.http.post('/users/createfacebookuser', user);
    }

    login(username: string, password: string) {
        return this.http.post('/users/authenticate', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    loginguest(propertyid: string){
        return this.http.post('/users/authenticatebyproperty', { propertyid: propertyid })
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            var user = response.json();
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }

            return user;
        });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}