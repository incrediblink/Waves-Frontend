import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoginService } from '../service/login';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { AlertService } from '../service/alert';
import { ValidationService } from '../const/validation.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'my-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
  providers: [LoginService, ChangeDetectorRef]
})
export class LoginComponent implements OnInit {

    public username; public password; public helpText;

    constructor(
        private loginService: LoginService, 
        private router: Router, 
        private ref: ChangeDetectorRef,
        private cookieService: CookieService,
        private Validation: ValidationService,
        private alertService: AlertService,
        private titleService: Title
    ) { 
        if (this.cookieService.get('waves_permission'))
            this.router.navigate(['/']);
        this.titleService.setTitle('登录浪潮');
    }

    login: any = function(username, password) {
        this.loginService
            .login(username, password)
            .subscribe(
                result => {
                    if (result.status == 200)
                        this.router.navigate(['/']);
                    this.alertService.push('您已成功登录。', 'success');
                },
                error => {
                    this.alertService.push(error, 'danger');
                    this.ref.detectChanges();
                }
            );
    }

    ngOnInit() {}
}
