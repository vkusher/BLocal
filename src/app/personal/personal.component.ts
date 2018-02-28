import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})


export class PersonalComponent implements OnInit {

  private color: any = "black";
  private checked: boolean = false;
  private disabled: boolean = false;
  private model: any = {};

  constructor() { }

  ngOnInit() {
  }

  openimg():void{

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
      "left": "100px"
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
