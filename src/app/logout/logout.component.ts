import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';

@Component({
    selector: 'my-logout',
    template: ``
})
export class LogoutComponent {

    constructor(private router: Router, 
        private cookieService: CookieService) { 
            this.cookieService.removeAll();
            this.router.navigate(['/login']);
    }

}
