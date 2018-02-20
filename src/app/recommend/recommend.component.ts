import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { PropertyService, AlertService } from '../_services/index'
import { Observable } from 'rxjs/Observable';
import {AppComponent} from '../app.component'

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})

export class RecommendComponent implements OnInit, OnDestroy {

  private propId: string;
  private routeSubscription: Subscription;
  private loading: boolean = false;
  model: any = {};

  constructor(private propService : PropertyService,private alertService : AlertService, private route : ActivatedRoute
    , private app: AppComponent) {    
       
      
    this.routeSubscription = this.route.params.subscribe(params => {
      this.propId = params["propertyid"];              
  });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {        
    this.routeSubscription.unsubscribe();    
  }

  sendMessage(){

    let msg = document.getElementById("recmessage").innerHTML;
    if(!msg){
      this.alertService.error("Please, provide some details");
      return;
    }
    else{
      this.alertService.success('');
    }

    this.loading = true;
    
    let uid = this.app.userDetails.uid;

    this.propService.sendRecommendation(this.propId, uid, msg).subscribe( data =>{
      if(data){
        this.alertService.success("The message has been sent");
        this.model.message = '';
        this.loading = false;
      }
      else{
        this.alertService.error("Unable to send a message");
        this.model.message = '';
        this.loading = false;
      }
    });

  }

}
