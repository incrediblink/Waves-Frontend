import { Component, OnInit } from '@angular/core';
import { TagService } from '../../service/tag';

@Component({
  selector: 'my-user-admin',
  templateUrl: './user.admin.component.html',
  styleUrls: ['./user.admin.component.scss'],
  providers: [TagService]
})
export class UserAdminComponent implements OnInit {
    constructor(private tagService: TagService) {
        // Do stuff
    }

    ngOnInit() {
        console.log('Hello user admin.');
    }
}
