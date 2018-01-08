import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';
import { FacebookService, InitParams, LoginResponse  } from 'ngx-facebook';
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
        private fb: FacebookService) { 
            let initParams: InitParams = {
                appId: '414359645650112',
                xfbml: true,
                version: 'v2.11'
              };
           
              fb.init(initParams);
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
        .then((response: LoginResponse) => 
        {           
            
            this.fb.api('/me','post',{fields: 'last_name,first_name,email'} ).then(resp=>
                {
                    console.log(resp);
                    var u = resp;
                    let user = {
                        _id: u.id,
                        firstName: u.first_name,
                        lastName: u.last_name,
                        username: u.email,
                        facebookid: u.id
                    };
                    
                    this.authenticationService.createFacebookUser(user);
                    
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.router.navigate([this.returnUrl]);
                });
            
        })
        .catch((error: any) => 
        {
            console.error(error)
            this.alertService.error(error);
            this.loading = false;
        });        
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    loginguest(){
        this.loading = true;
        this.authenticationService.loginguest(this.model.propertyid)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
