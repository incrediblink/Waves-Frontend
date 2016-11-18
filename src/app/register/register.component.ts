import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { RegisterService } from '../service/register';
import { ValidationService } from '../const/validation.service';
import { Title } from '@angular/platform-browser';
import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
  selector: 'my-register',
  styleUrls: ['register.component.scss'],
  templateUrl: './register.component.html',
  providers: [RegisterService]
})
export class RegisterComponent {

    public username; public password; public email;

    public register = () => {
        let loadingID: number;
        let loadingToast: ToastOptions = {
            title: '',
            msg: "正在发出注册请求……",
            showClose: true,
            onAdd: (toast: ToastData) => {
                loadingID = toast.id;
            }
        };
        this.toastyService.wait(loadingToast);
        this.registerService.register(this.username, this.password, this.email)
            .subscribe(
                result => {
                    this.toastyService.clear(loadingID);
                    this.toastyService.success(result.data);
                    this.router.navigate(['/event']);
                },
                err => {
                    this.toastyService.clear(loadingID);
                    this.toastyService.warning(err);
                }
            );
    };

    constructor
        (
            private registerService: RegisterService,
            private router: Router,
            private ref: ChangeDetectorRef,
            private Validation: ValidationService,
            private titleService: Title,
            private toastyService: ToastyService
        ) {
            if (Cookie.get('waves_permission'))
                this.router.navigate(['/event']);
            this.titleService.setTitle('注册浪潮账号');
        }
}
