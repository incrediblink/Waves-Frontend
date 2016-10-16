import { Component } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { AlertService } from '../../service/alert';
import { GlobalService } from '../../global';
import { OauthService } from '../../service/oauth';

@Component({
  selector: 'my-setting-home',
  templateUrl: './setting.my.component.html',
  styleUrls: ['./setting.my.component.scss'],
  providers: [OauthService]
})
export class MySettingComponent {

    private userInfo = JSON.parse(this.cookieService.get('waves_user'));

    private connectTwitter:any = function() {
        window.open(this.Global.api + 'oauth/twitter?a=' + Math.floor(99999999999999999999 * Math.random()), '', 'status=no,menubar=no,titlebar=no,toolbar=no,directories=no, width=600,height=400');
    };

    private disconnectTwitter:any = function() {
        this.oauthService.disconnectTwitter()
            .subscribe(
                () => this.alertService.push('成功解除 Twitter 账户绑定。', 'success')
            );
    };

    constructor(
        private cookieService: CookieService,
        private alertService: AlertService,
        private Global: GlobalService,
        private oauthService: OauthService
    ) {
        setInterval(() => {
            this.userInfo = this.cookieService.get('waves_user')
                ? JSON.parse(this.cookieService.get('waves_user'))
                : {};
        }, 500);
    }
}
