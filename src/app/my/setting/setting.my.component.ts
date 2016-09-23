import { Component } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { AlertService } from '../../service/alert';
import { GlobalService } from '../../global';

@Component({
  selector: 'my-setting-home',
  templateUrl: './setting.my.component.html',
  styleUrls: ['./setting.my.component.scss']
})
export class MySettingComponent {
    
    private userInfo = JSON.parse(this.cookieService.get('waves_user'));

    constructor(
        private cookieService: CookieService,
        private alertService: AlertService,
        private Global: GlobalService
    ) {
        
    }
}