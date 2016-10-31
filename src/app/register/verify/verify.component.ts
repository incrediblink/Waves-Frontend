import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { RegisterService } from '../../service/register';
import { AlertService } from '../../service/alert';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'my-verifier',
  template: `验证中，请稍候`,
  providers: [ChangeDetectorRef, RegisterService]
})
export class VerifyComponent implements OnInit {

    public sub; public id;

    constructor(
        private registerService: RegisterService,
        private router: Router,
        private route: ActivatedRoute,
        private ref: ChangeDetectorRef,
        private cookieService: CookieService,
        private alertService: AlertService,
        private titleService: Title
    ) {
        if (this.cookieService.get('waves_permission'))
            this.router.navigate(['/']);
        this.titleService.setTitle('验证浪潮账号');
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.registerService.verify(this.id)
                .subscribe(
                    () => {
                        this.alertService.push('验证成功！', 'success');
                        this.router.navigate(['/login']);
                    },
                    () => {
                        this.alertService.push('验证失败', 'warning');
                        this.router.navigate(['/']);
                    }
                );
        });
    }
}
