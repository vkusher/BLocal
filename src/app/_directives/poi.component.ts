import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { PointOfInterestService } from '../_services/index';
import { PointOfInterest } from '../_models/index';

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

  constructor(private route: ActivatedRoute, private poiService: PointOfInterestService) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.catId = params["categoryid"];
    });
    this.poiSubscription = this.poiService.getPoisForCategory(this.catId).subscribe(data => { this.pois = data; });
  }

  ngOnDestroy(): void {    
    this.poiSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  
}
