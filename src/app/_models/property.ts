export class Property{
    _id: string;
    name: string;
    address: string;
    city: string;
    county: string;
    state: string;
    country: string;
    zipcode: string;
    latitude: Number;
    longitude: Number;    
    pictures: Array<Picture>;
}

export class Picture{
    _id: string;
    propertyid: string;
    bigurl: string;
    smallurl:string;
}