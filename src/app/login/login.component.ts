import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService, UserService } from '../_services/index';


import { User } from '../_models/index';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private userService: UserService) { 
            
        }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    loginWithFacebook(){
        this.loading = true;
        this.authenticationService.loginWithFacebook()
        .then(res=>{
            console.error(res);
            this.loading = false;
            this.userService.createUserFromFacebook(res);
            this.router.navigate([this.returnUrl]);            
        })
        .catch(error=>{
            console.error(error)
            this.alertService.error(error);
            this.loading = false;
        });          
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .then(
                data => {
                    this.router.navigate([this.returnUrl]);
                })
                .catch(error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    loginguest(){
        /*this.loading = true;
        this.authenticationService.loginguest(this.model.propertyid)
            .then(
                data => {
                    this.router.navigate([this.returnUrl]);
                }
                .catch(error => {
                    this.alertService.error(error);
                    this.loading = false;
                });*/
    }
}
