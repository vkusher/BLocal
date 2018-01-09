import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from '../_models/index';


@Injectable()
export class UserService {    
    constructor(private db: AngularFirestore) {
        
    }
    users: Observable<any[]>;


    createUser(user: User){
        let usersRef = this.db.collection("users");
        usersRef.doc(user._id).set({             
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,                
            username: user.username,
            isOwner: false,
            isAdmin: false,
            isEmailApproved: false
        })
        .catch( error => console.log(error));
    }

    createUserFromFacebook(facebookUser: any){
        if(facebookUser.additionalUserInfo && facebookUser.additionalUserInfo.profile && facebookUser.user){
            let prof = facebookUser.additionalUserInfo.profile;
            let usersRef = this.db.collection("users");
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
            .catch( error => console.log(error));
        }
    }
}