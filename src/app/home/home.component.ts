import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User, Property, Picture } from '../_models/index';
import { UserService, PropertyService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    public properties: Property[] = [];

    constructor(private userService: UserService, public propService: PropertyService) {
        this.propService.Properties.subscribe(data => {
            this.properties = data;
            console.log(data)
            alert('constructor' + data.length);
        });

        this.propService.Properties.map(data=>{
            this.properties = data;
        });
    }

    ngOnInit() {
        alert('ngOnInit' + this.properties.length);
    }


    
}