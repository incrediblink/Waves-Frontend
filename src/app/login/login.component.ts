import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        console.log('Login Component');
    }
}
