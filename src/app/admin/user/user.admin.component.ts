import { Component } from '@angular/core';

@Component({
    selector: 'my-user-admin',
    templateUrl: './user.admin.component.html',
    styleUrls: ['user.admin.component.scss']
})
export class UserAdminComponent {
    public tab = {
        userList: {
            active: true
        }
    }
    constructor() {}
}
