import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { RegisterService } from '../service/register';
import { ValidationService } from '../const/validation.service';
import { AlertService } from '../service/alert';

@Component({
  selector: 'my-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
  providers: [ChangeDetectorRef, RegisterService]
})
export class RegisterComponent implements OnInit {

    public username; public password; public email;

    public register = () => {
        this.registerService.register(this.username, this.password, this.email)
            .subscribe(
                result => this.alertService.push(result.data, 'success'),
                err => this.alertService.push(err, 'warning')
            );
    }

    constructor
        (
            private registerService: RegisterService,
            private router: Router, 
            private ref: ChangeDetectorRef,
            private cookieService: CookieService,
            private Validation: ValidationService,
            private alertService: AlertService
        ) { 
            if (this.cookieService.get('authorization'))
                this.router.navigate(['/']);
        }

    ngOnInit() {
        console.log('Register Component');
    }
}
