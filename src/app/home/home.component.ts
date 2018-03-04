import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs/Subscription";

import { Observable } from 'rxjs/Observable';
import { ISubscription } from "rxjs/Subscription";

import { User, Property, Picture } from '../_models/index';
import { UserService, PropertyService, AlertService } from '../_services/index';

import { AppComponent } from '../app.component'

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {
    model: any = {};
    currentUser: User;
    users: User[] = [];
    public properties: Property[] = [];
    private propSubscription: ISubscription;
    loading: boolean;
    private usSubscription: Subscription; 
    private isShowAround: boolean = false;
    private isShowAroundDisabled: boolean = true;

    constructor(private userService: UserService, 
        public propService: PropertyService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private router: Router,
        private app: AppComponent
    ) {
        
        this.fetchUserProperties();        
    }

    ngOnInit() {
        
    }

    ngOnDestroy(){
        this.propSubscription.unsubscribe();
        this.usSubscription.unsubscribe();
    }

    addNewProperty(){
        this.loading = true;
        let uid = this.app.getCurrentUserId();
        this.propService.addNewProperty(this.model.propertyid, uid).subscribe(data=>{
           
            if(data){
                this.model.propertyid = '';
                this.fetchUserProperties();
                this.loading = false;
            }
            else{
                this.loading = false;
                this.alertService.error('Invalid property id');
            }
        });
    }

    showLinks(): void{
        this.router.navigate(['links']);
    }
    
    showAround(): void{
        if(this.isShowAround){
            this.router.navigate(['around']);
        }
        else{
            this.router.navigate(['/personal', 'show']);
        }
        
    }

    fetchUserProperties(): void{
        let uid = this.app.getCurrentUserId();
        this.propSubscription = this.propService.getProperties(uid).subscribe(data => {
            this.properties = data;  
            
            this.usSubscription = this.userService.getUserByProperty(uid).subscribe( usr =>{
                this.isShowAroundDisabled = false;
                if(data.IsVisibleForMessaging){
                    this.isShowAround = true;                    
                }                
            });
            
        });
    }
}