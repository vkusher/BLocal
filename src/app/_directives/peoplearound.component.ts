import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../_services/index';
import { AlertService } from '../_services/index';
import { User } from '../_models/index';
import { AppComponent } from '../app.component'
//import { User } from 'firebase/app';

@Component({
  moduleId: module.id,
  selector: 'app-peoplearound',
  templateUrl: './peoplearound.component.html',
  styleUrls: ['./peoplearound.component.css']
})
export class PeopleAroundComponent implements OnInit {
  private pSubscription: Subscription;  
  
  public people: User[] = [];
  private catId: string;

  constructor(private route: ActivatedRoute, private userService: UserService,
  private app: AppComponent, private alertSrv: AlertService) { }

  ngOnInit() {
    if(!!navigator.geolocation) {
      let pos = navigator.geolocation.getCurrentPosition(t=>{
        let latitude = t.coords.latitude;
        let longitude = t.coords.longitude;
        this.pSubscription = this.userService.getPeopleAround(this.app.userDetails.uid, latitude,longitude ).subscribe(data => { this.people = data; });
      }); 
    } else {
      this.alertSrv.error("Your browser doesn't support geolocation");
    }
       
  }

  ngOnDestroy(): void {    
    this.pSubscription.unsubscribe();    
  }

  startChat(user: User): void{
    let pop = document.getElementById("chatPopup");
    pop.style.visibility = "visible";
    pop.style.display = "block";
  }

  closeChat(): void{
    let pop = document.getElementById("chatPopup");
    pop.style.visibility = "hidden";
    pop.style.display = "none";
  }

  senMessage(): void{
    this.alertSrv.success("Your message has been sent");
  }
}
