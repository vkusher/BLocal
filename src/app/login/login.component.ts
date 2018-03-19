import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService, UserService, PropertyService } from '../_services/index';


import { User } from '../_models/index';

import { environment } from '../../environments/environment';

import { AppComponent } from '../app.component'

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
        private userService: UserService,
        private propertyService: PropertyService,
        private app: AppComponent
    ) { 
            
            this.updateLayot(false);
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

    login(){
        if(!this.model.propertyid){
            this.loading = true;
            this.authenticationService.login(this.model.username, this.model.password)
                .then(
                    data => {
                        this.userService.updateUserId(this.model.username, data.uid);
                        this.router.navigate([this.returnUrl]);
                    })
                    .catch(error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });
        }
        else{
            this.loginguest();
        }
        
    }

    loginguest(){
        this.loading = true;
        this.propertyService.getPropertyDataByAirBnB(this.model.propertyid).subscribe(prop =>{
            if(prop.length){
                this.authenticationService.loginguest(this.model.propertyid)
                .then(
                    data => {
                        console.log(data);
                        this.loading = false;
                        this.router.navigate([this.returnUrl]);
                    })
                    .catch(error => {
                        console.log(error);
                        this.alertService.error(error);
                        this.loading = false;
                    });
            }
            else{
                this.alertService.error('Invalid Property Id');
                this.loading = false;
            }
        });
        
    }

    updateLayot(isDisabled: boolean): void{
        this.app.showLoading(isDisabled);
      }
}
