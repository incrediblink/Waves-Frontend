import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoginService } from '../service/login';
import { Router } from "@angular/router";

@Component({
  selector: 'my-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
  providers: [LoginService, ChangeDetectorRef]
})
export class LoginComponent implements OnInit {

    public username; public password; public helpText;

    constructor(private loginService: LoginService, private router: Router, private ref: ChangeDetectorRef) { 
    }

    login: any = function(username, password) {
        console.log(username, password)
        this.loginService
            .login(username, password)
            .subscribe(
                result => {
                    if (result.status == 200)
                        this.router.navigate(['/']);
                },
                error => {
                    this.helpText = error;
                    this.ref.detectChanges();
                    console.log(this.helpText);
                }
            );
    }

    ngOnInit() {
        console.log('Login Component');
    }
}
