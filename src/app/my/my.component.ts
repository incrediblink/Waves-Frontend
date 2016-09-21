import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../service/alert';

@Component({
    selector: 'my-home',
    template: ``
})
export class MyComponent {

    constructor(
        private router: Router, 
        private alertService: AlertService) { 
            this.alertService.push('“我的”功能尚未实现。', 'warning');
            this.router.navigate(['/']);
    }

}
