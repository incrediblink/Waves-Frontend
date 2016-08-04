import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { FORM_DIRECTIVES } from '@angular/forms';
import { BUTTON_DIRECTIVES } from 'ng2-bootstrap';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  directives: [BUTTON_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class HomeComponent implements OnInit {

  constructor() {
    // Do stuff
  }
   
  public singleModel:string = '1';
  public radioModel:string = 'Middle';
  public checkModel:any = {left: false, middle: true, right: false};

  ngOnInit() {
    console.log('Hello Home');
  }

}
