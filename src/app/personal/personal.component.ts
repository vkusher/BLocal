import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs/Subscription";
import { AppComponent} from '../app.component';
import { UserService, AlertService } from '../_services/index';


@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})


export class PersonalComponent implements OnInit, OnDestroy {

  private usSubscription: Subscription;  
  private routeSubscription: Subscription;
  private userUpdateSubscription: Subscription; 
  private color: any = "black";
  private checked: boolean = false;
  private disabled: boolean = false;
  private model: any = {};
  private isShowAroundMe: boolean = false;

  constructor(private app: AppComponent, private userService: UserService, 
    private router: Router, private route : ActivatedRoute, private alertSrvc: AlertService) { 
    
    this.updateLayot(true);
    this.model.picture = "../../assets/none.png";
    let uid = app.getCurrentUserId();

    this.routeSubscription = this.route.params.subscribe(params => {
      let reqId = params["reqid"];
      this.usSubscription = userService.getUserByProperty(uid).subscribe( usrs =>{
        let usr = usrs[0];
        console.log(usr);

        this.checked = usr.IsVisibleForMessaging;
        this.model.phone = usr.PhoneNumber;
        this.model.description = usr.UserPitch;
        this.model.picture = usr.Picture ? usr.Picture : "../../assets/none.png";
        this.model.gender = usr.Gender == 'female' ? 2 : 1;
        this.isShowAroundMe = usr.IsVisibleForMessaging;
        this.updateLayot(false);
        /*if(usr.IsVisibleForMessaging && reqId != 'update'){
          this.router.navigate(['/around']);
        }*/
      });
    });    
  }

  ngOnInit() {
    
  }

  ngOnDestroy(): void {        
    if(this.routeSubscription){
      this.routeSubscription.unsubscribe();
    }
    if(this.usSubscription){
      this.usSubscription.unsubscribe();  
    }
    if(this.userUpdateSubscription){
      this.userUpdateSubscription.unsubscribe(); 
    }
  }

  openimg():void{
    
  }

  updateLayot(isDisabled: boolean): void{
    this.app.showLoading(isDisabled);
  }

  updateUserData(): void{
    this.updateLayot(true);
    let userId = this.app.getCurrentUserId();
    this.userUpdateSubscription = this.userService.updateUserForMessaging(userId,this.model.phone, this.model.checked, 
      this.model.description, this.model.picture, this.model.gender).subscribe( ret =>{
      if(!ret){
        this.alertSrvc.error("Failed updating user's data");
      } 

      this.updateLayot(false);

    });

  }

  navigateToAround(){
    this.router.navigate(['/around']);
  }

  radioChanged(event:any){   
    this.model.gender = event.value == "1" ? 'male' : 'female';
    this.updateUserData();
  }

  onIsShowChange(event:any){
    this.model.checked = event.checked;
    this.updateUserData();
  }

  onRemoved(event:any){
    this.model.picture = '';
    this.updateUserData();
  }

  onUploadStateChanged(event:any) {    
    this.model.picture = event.src;
    this.updateUserData();
  }

  fileChangeEvent(event:any){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      let obj = this;
      reader.onload = function (e : any) {
        console.log(e.target.result);
        obj.model.picture = e.target.result;
        obj.updateUserData();
         
      }

      reader.readAsDataURL(event.target.files[0]);
    }  
    
  }

  customStyle = {
    clearButton : {
        "display": "none"
    },
    layout:{
      "height":"0px",
      "width":"0px",
      "padding":"0px",
      "position":"absolute" 
    },
    selectButton:{
      "height":"36px",
      "width":"36px",
      "position":"absolute", 
      "top": "-30px",      
      "left": "100px",
      "background-image" : "url('../assets/loadimage.png')"
    },
    previewPanel:{
      "position":"absolute", 
      "height": "0px",
      "width": "0px",
      "right": "-150px",
      "top": "-50px"
    }
    
  }

}
