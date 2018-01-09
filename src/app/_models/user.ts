export class User {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;    
    firebaseId: string;  
    phoneNumber: string;  
    isOwner: Boolean;
    isAdmin: Boolean;
    isEmailApproved: Boolean;
}