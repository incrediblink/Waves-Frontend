import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { AlertService } from '../service/alert';

@Component({
    selector: 'my-logout',
    template: ``
})
export class LogoutComponent {

    constructor(
        private router: Router, 
        private cookieService: CookieService,
        private alertService: AlertService) { 
            this.cookieService.removeAll();
            this.alertService.push('您已登出账号。', 'success');
            this.router.navigate(['/login']);
    }

}
