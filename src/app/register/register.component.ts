import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService, AuthenticationService } from '../_services/index';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';
import { User } from '../_models/index';

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
        this.loading = true;
        this.authService.registerNewUser(this.model.username, this.model.password)
        //Promise.resolve(this.afAuth.auth.createUserWithEmailAndPassword(this.model.email, this.model.password))
        .then(resp =>{            
            let user = this.afAuth.auth.currentUser;            
            console.log(user);
            this.createUserInDb(resp.uid);
            this.alertService.success('Registration successful', true); 
            user.sendEmailVerification();  
            this.router.navigate(['/login']);          
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

    private createUserInDb(id: string) : void{
        let usr = new User();
        usr._id = id;
        usr.firstName =  this.model.firstName;
        usr.lastName =  this.model.lastName;
        usr.username =  this.model.username;
        usr.phoneNumber =  this.model.phoneNumber;
        this.userService.createUser(usr);
    }
}
