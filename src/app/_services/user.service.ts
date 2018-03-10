import { Injectable } from '@angular/core';

import { Http, RequestOptionsArgs} from '@angular/http';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/operator/toPromise';
import { User } from '../_models/index';
import { environment } from '../../environments/environment';


@Injectable()
export class UserService {    
  
    
  
  
    constructor(private db: AngularFirestore, private httpService: Http ) {
        
    }
    users: Observable<any[]>;


    createUser(user: User){
        
        let newUser :any = {
            FirstName: user.FirstName,
            LastName: user.LastName,
            PhoneNumber: user.PhoneNumber,
            UserName: user.UserName,
            IsOwner: false,
            IsAdmin: false,
            IsEmailApproved: false,
            FireBaseId: user.FireBaseId
        };
        
        this.httpService.post(environment.apiurl + 'createuser', newUser ).subscribe(error => console.log(error));
    }

    createUserFromFacebook(facebookUser: any){
        if(facebookUser.additionalUserInfo && facebookUser.additionalUserInfo.profile && facebookUser.user){
            let prof = facebookUser.additionalUserInfo.profile;           

            let newUser: any = {
                FirstName: prof.first_name,
                LastName: prof.last_name,
                PhoneNumber: '',
                UserName: prof.email,
                IsOwner: false,
                IsAdmin: false,
                IsEmailApproved: false,
                Link: prof.link,
                Gender: prof.gender,
                Picture: prof.picture.data.url,
                ProviderId: 'facebook.com'

            };

            this.httpService.post( environment.apiurl + 'createuser', newUser).subscribe(error => console.log(error));
        }
    };

    updateUserId(username: string, firebaseid: string): any {
        let usr: any = {
            UserName: username,
            FireBaseId: firebaseid
        };
        this.httpService.post( environment.apiurl + 'updateuser', usr).subscribe(error => console.log(error));
    };

    updateUserForMessaging(firebaseid: string, phone: string, isShow : boolean, message: 
        string, pict: string, gender: string){
        let usr: any = {            
            FireBaseId: firebaseid,
            PhoneNumber: phone,
            Picture: pict,
            IsVisibleForMessaging: isShow,
            UserPitch: message,
            Gender: gender
        };
        return this.httpService.post( environment.apiurl + 'updateuserformessaging', usr);
    }

    getUserByProperty(propertyid: string){        

        return this.httpService.get( environment.apiurl + 'getuser/' + propertyid).map(data=>data.json());

    };

    getPeopleAround(userid: string, latitude: any, longitude: any): any {
        let postData = {
            FireBaseId: userid,
            Latitude: latitude,
            Longitude: longitude
        };
        return this.httpService.post( environment.apiurl + 'getpeople', postData ).map(data=>data.json());
    }

    setUserLocation(userid: any, latitude: any, longitude: any): any {
        let postData = {
            FireBaseId: userid,
            Latitude: latitude,
            Longitude: longitude
        };
        this.httpService.post( environment.apiurl + 'setuserlocation', postData )
    }

    sendMessage(postData: any): any {
        return this.httpService.post( environment.apiurl + 'sendmessage', postData ).map(data=>data.json());
    }
}