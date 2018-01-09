import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService, AuthenticationService } from '../_services/index';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading: Boolean = false;

    constructor(        
        private afAuth: AngularFireAuth,
        private router: Router,
        private userService: UserService,
        private authService: AuthenticationService,
        private alertService: AlertService) {
            
         }

    register() {
        let $this = this;
        this.loading = true;
        this.authService.registerNewUser(this.model.username, this.model.password)
        //Promise.resolve(this.afAuth.auth.createUserWithEmailAndPassword(this.model.email, this.model.password))
        .then(resp =>{            
            var user = this.afAuth.auth.currentUser;
            console.log(resp);
            console.log(user);
            this.alertService.success('Registration successful', true);
            //this.router.navigate(['/login']);
        })
        .catch(error => {
            // Handle Errors here.
            console.log(error);
            console.log(this);
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                errorMessage = 'The password is too weak.';
              }
            this.alertService.error(error);
            this.loading = false;
          });        
    }
}
