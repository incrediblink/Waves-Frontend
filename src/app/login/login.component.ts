import { Component } from '@angular/core';
import { LoginService } from '../service/login';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { ValidationService } from '../const/validation.service';
import { Title } from '@angular/platform-browser';
import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
  selector: 'my-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
  providers: [LoginService]
})
export class LoginComponent {

    public username; public password; public helpText;

    constructor(
        private loginService: LoginService,
        private router: Router,
        private cookieService: CookieService,
        private Validation: ValidationService,
        private titleService: Title,
        private toastyService: ToastyService
    ) {
        if (this.cookieService.get('waves_permission'))
            this.router.navigate(['/']);
        this.titleService.setTitle('登录浪潮');
    }

    login: any = function(username, password) {
        let loadingID: number;
        let loadingToast: ToastOptions = {
            title: '',
            msg: "正在登录……",
            showClose: true,
            onAdd: (toast: ToastData) => {
                loadingID = toast.id;
            }
        };
        this.toastyService.wait(loadingToast);
        this.loginService
            .login(username, password)
            .subscribe(
                result => {
                    if (result.status == 200)
                        this.router.navigate(['/']);
                    this.toastyService.clear(loadingID);
                    this.toastyService.success("登录成功。");
                },
                error => {
                    this.toastyService.clear(loadingID);
                    this.toastyService.error(error);
                }
            );
    };
}
