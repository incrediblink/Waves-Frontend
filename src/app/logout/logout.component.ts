import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { ToastyService } from 'ng2-toasty';
import { LoginService } from '../service/login';

@Component({
    selector: 'my-logout',
    template: ``,
    providers: [LoginService]
})
export class LogoutComponent {

    public logout = () => {
        document.cookie = "waves_authorization=;domain=.langchao.land;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        document.cookie = "waves_user=;domain=.langchao.land;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        document.cookie = "waves_permission=;domain=.langchao.land;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        this.cookieService.removeAll();
        this.toastyService.success('您已登出账号。');
        this.router.navigate(['/login']);
    };

    constructor(
        private router: Router,
        private cookieService: CookieService,
        private toastyService: ToastyService,
        private loginService: LoginService
    ) {
        this.loginService.logout()
            .subscribe(
                data => this.logout(),
                error => this.logout()
            );
    }
}
