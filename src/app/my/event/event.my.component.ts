import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { GlobalService } from '../../global';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../service/user';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
    selector: 'my-event-home',
    templateUrl: './event.my.component.html',
    styleUrls: ['event.my.component.scss'],
    providers: [UserService]
})
export class MyEventComponent {

    public eventCollection; public opacity = 0;

    constructor(
        private ref: ChangeDetectorRef,
        private Global: GlobalService,
        private titleService: Title,
        private toastyService: ToastyService,
        private userService: UserService
    ) {
        if ((Cookie.get('waves_user') && Cookie.get('waves_permission'))) {
            this.titleService.setTitle('正在关注的事件 | ' + this.Global.slogan);
            this.userService.getFollowingEvent()
                .subscribe(
                    data => {
                        this.eventCollection = data;
                        for (let event of this.eventCollection) {
                            if (event.HeaderImage)
                                event.ImageUrl = this.Global.cdn + event.HeaderImage.ImageUrl + '!web';
                        }
                        this.ref.detectChanges();
                        setTimeout(() => {
                            this.opacity = 1;
                            this.ref.detectChanges();
                        }, 200);
                    }
                );
        }
    }

}
