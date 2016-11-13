import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TagService } from '../service/tag';
import { GlobalService } from '../global';
import { Title } from '@angular/platform-browser';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'my-tag',
  styleUrls: ['./tag.component.scss'],
  templateUrl: './tag.component.html',
  providers: [ChangeDetectorRef, TagService]
})
export class TagComponent implements OnInit, OnDestroy {

    public tag = {
        Title: null,
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
        private Global: GlobalService,
        private titleService: Title,
        private toastyService: ToastyService
    ) { }

    public sub; public id;

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.tagService.get(this.id)
                .subscribe(
                    tag => {
                        for (let i = 0; i < tag.Events.length; i++) {
                            if (tag.Events[i].HeaderImage)
                                tag.Events[i].ImageUrl = this.Global.cdn + tag.Events[i].HeaderImage.ImageUrl + '!web';
                        }
                        this.tag = tag;
                        this.ref.detectChanges();
                        this.titleService.setTitle('标签 - ' + this.tag.Title + ' | ' + this.Global.slogan);
                    },
                    err => {
                        this.toastyService.warning("你所查看的标签不存在或已被隐藏！");
                        this.router.navigate(['/event']);
                    }
                );
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
