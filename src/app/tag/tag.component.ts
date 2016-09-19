import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TagService } from '../service/tag';
import { GlobalService } from '../global';

@Component({
  selector: 'my-tag',
  styleUrls: ['./tag.component.scss'],
  templateUrl: './tag.component.html',
  providers: [ChangeDetectorRef, TagService]
})
export class TagComponent implements OnInit, OnDestroy {

    public tag = {
        Events: [{
            ImageUrl: null,
            Subscriber: [0],
            News: []
        }]
    }

    constructor(
        private tagService: TagService,
        private router: Router, 
        private route: ActivatedRoute,
        private ref: ChangeDetectorRef,
        private Global: GlobalService
    ) { }

    public sub; public id;

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.tagService.get(this.id)
                .subscribe(
                    tag => {
                        for (let i = 0; i < tag.Events.length; i++) {
                            tag.Events[i] = JSON.parse(tag.Events[i]);
                            tag.Events[i].ImageUrl = this.Global.cdn + tag.Events[i].HeaderImage.ImageUrl;
                        }
                        this.tag = tag;
                        this.ref.detectChanges();
                    }
                );
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
