import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TagService } from '../service/tag';
import { GlobalService } from '../global';
import { Title } from '@angular/platform-browser';
import { ToastyService } from 'ng2-toasty';
// import { MetadataService } from 'ng2-metadata';

@Component({
  selector: 'my-tag',
  styleUrls: ['tag.component.scss'],
  templateUrl: './tag.component.html',
  providers: [TagService]
})
export class TagComponent implements OnInit, OnDestroy {

    public tag = {
        Title: null,
        Events: []
    };

    constructor(
        private tagService: TagService,
        private router: Router,
        private route: ActivatedRoute,
        private ref: ChangeDetectorRef,
        private Global: GlobalService,
        private titleService: Title,
        private toastyService: ToastyService
        // private metadataService: MetadataService
    ) { }

    public sub; public id; public opacity = 0;

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
                        setTimeout(() => {
                            this.opacity = 1;
                            this.ref.detectChanges();
                        }, 200);
                        // this.metadataService.setTitle('标签 - ' + this.tag.Title);
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
