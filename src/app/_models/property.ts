export class Property{
    PropertyId: string;
    Name: string;
    Address: string;
    City: string;
    County: string;
    State: string;
    Country: string;
    ZipCode: string;
    Lat: Number;
    Long: Number;    
    Pictures: Array<Picture>;
}

export class Picture{
    PictureId: string;
    PropertyId: string;
    BigUrl: string;
    SmallUrl:string;
}