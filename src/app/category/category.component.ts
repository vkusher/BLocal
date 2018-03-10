import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { PropertyService } from '../_services/index';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  private srvSubscription: Subscription; 
  private routeSubscription: Subscription;
  private model: any = {};

  constructor(private propService: PropertyService, private route: ActivatedRoute,) { 

  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      let propId = params["propertyid"]; 
      if(propId != "0"){     
        this.srvSubscription = this.propService.getOwnerName(propId).subscribe(data => { this.model.ownername = data; });
      }
      else{
        this.model.ownername = 'Owner';
      }
    });
  }

  ngOnDestroy(){
    if(this.srvSubscription){
      this.srvSubscription.unsubscribe();
    }
  }
}
