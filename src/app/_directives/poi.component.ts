import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { PointOfInterestService } from '../_services/index';
import { PointOfInterest } from '../_models/index';
import { AppComponent } from '../app.component';


@Component({
  moduleId: module.id,
  selector: 'app-pois',
  templateUrl: './poi.component.html',
  styleUrls: ['./poi.component.css']
})
export class PoiComponent implements OnInit {
  private poiSubscription: Subscription;  
  private routeSubscription: Subscription;
  public pois: PointOfInterest[] = [];
  private catId: string;
  private propId: string;

  constructor(private route: ActivatedRoute, 
    private poiService: PointOfInterestService, private app: AppComponent) { 

  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.catId = params["categoryid"];
      this.propId = params["propertyid"];
      let uid = this.app.getCurrentUserId();
      this.poiSubscription = this.poiService.getPoisForCategory(this.catId, this.propId, uid).subscribe(data => { this.pois = data; });
    });
    
  }

  ngOnDestroy(): void {   
    if(this.poiSubscription){ 
      this.poiSubscription.unsubscribe();
    }
    if(this.routeSubscription){
      this.routeSubscription.unsubscribe();
    }
  }

  
}
