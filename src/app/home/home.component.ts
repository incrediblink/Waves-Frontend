import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { FORM_DIRECTIVES } from '@angular/forms';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class HomeComponent implements OnInit {

  constructor() {
    // Do stuff
  }
   
  ngOnInit() {
    console.log('Hello Home');
  }

}
