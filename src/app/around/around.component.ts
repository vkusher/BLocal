import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs/Subscription";
import { AppComponent} from '../app.component';
import { UserService } from '../_services/index';

@Component({
  selector: 'app-around',
  templateUrl: './around.component.html',
  styleUrls: ['./around.component.css']
})
export class AroundComponent implements OnInit, OnDestroy {

  private usSubscription: Subscription;    

  constructor(private app: AppComponent, private userService: UserService, 
    private router: Router, private route : ActivatedRoute) { 

      let uid = app.getCurrentUserId();

      this.usSubscription = userService.getUserByProperty(uid).subscribe( usrs =>{
          
        if( usrs[0] && !usrs[0].IsVisibleForMessaging){
          this.router.navigate(['/personal', 'show']);
        }
      });
    }

  ngOnInit() {
  }

  ngOnDestroy(): void {            
    this.usSubscription.unsubscribe();   
  }

  viewProperties(): void{
    this.router.navigate(['/personal', 'show']);
  }
}
