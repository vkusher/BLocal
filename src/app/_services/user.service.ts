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
        /*let usersRef = this.db.collection("users");
        usersRef.doc(user._id).set({             
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,                
            username: user.username,
            isOwner: false,
            isAdmin: false,
            isEmailApproved: false
        })
        .catch( error => console.log(error));*/
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
            /*let usersRef = this.db.collection("users");
            usersRef.doc(facebookUser.user.uid).set({             
                firstName: prof.first_name,
                lastName: prof.last_name,
                phoneNumber: '',                
                username: prof.email,
                isOwner: false,
                isAdmin: false,
                isEmailApproved: false,
                link: prof.link,
                gender: prof.gender,
                picture: prof.picture.data.url,
                providerId: 'facebook.com'
                
            })
            .catch( error => console.log(error));*/

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
        /*let usersRef = this.db.collection("users");
        let users = usersRef.ref.where('propertyid','==',propertyid);

        return users.get();*/

        return this.httpService.get( environment.apiurl + 'getuser/' + propertyid).toPromise();

    }
}