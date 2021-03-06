import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { PropertyService } from '../_services/index'
import { Observable } from 'rxjs/Observable';
import {AppComponent} from '../app.component'

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit, OnDestroy {

  private propId: string;
  private isVoted: boolean;
  private pData: any = {};  
  private routeSubscription: Subscription;
  private isValidGuest: boolean = true;

  constructor(private propService : PropertyService, private route : ActivatedRoute
    , private app: AppComponent) {    
    
    this.isVoted = false; 
      
    this.routeSubscription = this.route.params.subscribe(params => {
      this.propId = params["propertyid"];
      propService.getPropertyData(this.propId).subscribe(data=>{        
        if(data){
          this.pData = data;
          this.isValidGuest = data.IsGuest;         
        }
        
      });          
  });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {        
    this.routeSubscription.unsubscribe();    
  }

  voteForProperty(): void{

    this.propService.voteForProperty(this.propId,this.app.userDetails.uid).subscribe(data=>{        
      if(data){
        this.isVoted = data;         
      }
      
    });
  }

  openPopup(id): void{
    var popup = document.getElementById(id);
    popup.classList.toggle("show");
  }

  closePopup(id): void{
    var popup = document.getElementById(id);
    popup.classList.toggle("show");
  }
  
  parsePhone(phone: string): string{
    return phone ? phone.replace('+','').replace(/ /g,'') : '';
  }

  proposeLink(): void{
    
  }
}
