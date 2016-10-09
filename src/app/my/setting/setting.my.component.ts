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

    private connectTwitter:any = function() {
        window.open(this.Global.api + 'oauth/twitter?a=' + Math.floor(99999999999999999999 * Math.random()), '', 'status=no,menubar=no,titlebar=no,toolbar=no,directories=no, width=600,height=400');
    }

    private disconnectTwitter:any = function() {

    }

    constructor(
        private cookieService: CookieService,
        private alertService: AlertService,
        private Global: GlobalService
    ) {
        
    }
}