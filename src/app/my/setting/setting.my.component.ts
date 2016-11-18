import { Component } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastyService } from 'ng2-toasty';
import { GlobalService } from '../../global';
import { OauthService } from '../../service/oauth';

@Component({
  selector: 'my-setting-home',
  templateUrl: './setting.my.component.html',
  styleUrls: ['setting.my.component.scss'],
  providers: [OauthService]
})
export class MySettingComponent {

    private userInfo = JSON.parse(Cookie.get('waves_user'));

    private connectTwitter:any = function() {
        window.open(this.Global.api + 'oauth/twitter?a=' + Math.floor(99999999999999999999 * Math.random()), '', 'status=no,menubar=no,titlebar=no,toolbar=no,directories=no, width=600,height=400');
    };

    private disconnectTwitter:any = function() {
        this.oauthService.disconnectTwitter()
            .subscribe(
                () => this.toastyService.success('成功解除 Twitter 账户绑定。')
            );
    };

    constructor(
        private toastyService: ToastyService,
        private Global: GlobalService,
        private oauthService: OauthService
    ) {
        setInterval(() => {
            this.userInfo = Cookie.get('waves_user')
                ? JSON.parse(Cookie.get('waves_user'))
                : {};
        }, 500);
    }
}
