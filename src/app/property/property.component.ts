import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { PropertyService } from '../_services/index'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit, OnDestroy {

  private propId: string;
  private pData: any = {};  
  private routeSubscription: Subscription;

  constructor(private propService : PropertyService, private route : ActivatedRoute) {     
    this.routeSubscription = this.route.params.subscribe(params => {
      this.propId = params["propertyid"];
      propService.getPropertyData(this.propId).then(data=>{        
        if(data.length > 0){
          this.pData = data[0];         
        }
        
      });          
  });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {        
    this.routeSubscription.unsubscribe();    
  }

}
