import { Component, OnInit } from '@angular/core';
import { TagService } from '../../service/tag';

@Component({
  selector: 'my-tag-admin',
  templateUrl: './tag.admin.component.html',
  styleUrls: ['./tag.admin.component.scss'],
  providers: [TagService]
})
export class TagAdminComponent implements OnInit {
    public tab = {
        createTag: {
            active: true
        },
        addEvent: {
            active: false
        }
    }

    public createTag = {
        title: null,
        event: null
    }

    public addEvent = {
        id: null,
        event: null
    }

    public createTagService = (title: string, event: string) => {
        this.tagService.create(title, event)
            .subscribe(
                data => {
                    console.log(data);
                    this.createTag = {
                        title: null,
                        event: null
                    }
                },
                err => console.log(err)
            )
    }

    public addEventService = (id: string, event: string) => {
        this.tagService.add(id, event)
            .subscribe(
                data => {
                    console.log(data);
                    this.addEvent.event = null;
                },
                err => console.log(err);
            )
    }

    constructor(private tagService: TagService) {
        // Do stuff
    }

    ngOnInit() {
        console.log('Hello tag');
    }

}
