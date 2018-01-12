import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ISubscription } from "rxjs/Subscription";

import { User, Property, Picture } from '../_models/index';
import { UserService, PropertyService } from '../_services/index';

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
    

    constructor(private userService: UserService, 
        public propService: PropertyService,
        private route: ActivatedRoute,
        private router: Router) {
        this.propSubscription = this.propService.Properties.subscribe(data => {
            this.properties = data;              
        });

        
    }

    ngOnInit() {
        
    }

    ngOnDestroy(){
        this.propSubscription.unsubscribe();
    }

    addNewProperty(){

    }

    showLinks(){
        this.router.navigate(['links']);
    }
    
}