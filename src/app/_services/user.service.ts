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
            FirstName: user.firstName,
            LastName: user.lastName,
            PhoneNumber: user.phoneNumber,
            UserName: user.username,
            IsOwner: false,
            IsAdmin: false,
            IsEmailApproved: false
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
    }

    getUserByProperty(propertyid: string){        

        return this.httpService.get( environment.apiurl + 'getuser/' + propertyid).toPromise();

    }
}