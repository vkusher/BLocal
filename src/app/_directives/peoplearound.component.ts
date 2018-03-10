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
  private model: any;
  public people: User[] = [];
  private catId: string;
  private cuserId: any;

  constructor(private route: ActivatedRoute, private userService: UserService,
  private app: AppComponent, private alertSrv: AlertService) { }

  ngOnInit() {
    if(!!navigator.geolocation) {
      let pos = navigator.geolocation.getCurrentPosition(t=>{
        let latitude = t.coords.latitude;
        let longitude = t.coords.longitude;
        this.pSubscription = this.userService.getPeopleAround(this.app.getCurrentUserId(), latitude,longitude ).subscribe(data => { this.people = data; });
      }); 
    } else {
      this.alertSrv.error("Your browser doesn't support geolocation");
    }
       
  }

  ngOnDestroy(): void {    
    this.pSubscription.unsubscribe();    
  }

  startChat(user: any): void{
    this.cuserId = user.FireBaseId;
    let pop = document.getElementById("chatPopup");
    pop.style.visibility = "visible";
    pop.style.display = "block";
  }

  closeChat(): void{
    this.cuserId = '';
    document.getElementById('chatmessage').innerHTML = '';
    let pop = document.getElementById("chatPopup");
    pop.style.visibility = "hidden";
    pop.style.display = "none";
  }

  sendMessage(): void{
    let msg = {
      FromUserId: this.app.getCurrentUserId(),
      ToUserId: this.cuserId,
      Message: document.getElementById('chatmessage').innerHTML
    };
    this.userService.sendMessage(msg).subscribe(ret =>{
      this.alertSrv.success("Your message has been sent");
      this.closeChat();
      var that = this;
      setTimeout(function(){
        that.alertSrv.success('');
      }, 1000);
    });
    
  }

  retrieveImage(user: any): string{
    let ret;
    if(user.Picture){
      ret = user.Picture;
    }
    else{
      ret = '../../assets/' + user.Gender + '.png';
    }

    return ret;
  }
}
