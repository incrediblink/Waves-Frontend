import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { AlertService } from '../service/alert';

@Component({
  selector: 'my-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
    
    private userInfo = JSON.parse(this.cookieService.get('user'));

    constructor(
        private cookieService: CookieService,
        private alertService: AlertService,
        private router: Router
    ) {
        if (!(this.cookieService.get('authorization') &&
            this.cookieService.get('user') &&
            this.cookieService.get('permission'))) {
            this.alertService.push('您需要先登录才能访问设置页面。', 'warning');
            this.router.navigate(['/login']);
        }
    }

    ngOnInit() {}
}