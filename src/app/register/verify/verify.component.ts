import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { RegisterService } from '../../service/register';
import { Title } from '@angular/platform-browser';
import { ToastyService } from 'ng2-toasty';

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
        private toastyService: ToastyService,
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
                        this.toastyService.success('验证成功！');
                        this.router.navigate(['/login']);
                    },
                    () => {
                        this.toastyService.error('验证失败');
                        this.router.navigate(['/']);
                    }
                );
        });
    }
}
