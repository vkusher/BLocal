import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { PointOfInterestService } from '../_services/index';
import { PointOfInterest } from '../_models/index';

@Component({
  moduleId: module.id,
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class PoiComponent implements OnInit {
  private poiSubscription: Subscription;
  public pois: PointOfInterest[] = [];

  constructor(private poiService: PointOfInterestService) { }

  ngOnInit() {
    this.poiSubscription = this.poiService.PointsOfInterest.subscribe(data => { this.pois = data; });
  }

  ngOnDestroy(): void {    
    this.poiSubscription.unsubscribe();
  }
}
