import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { TagService } from '../../service/tag';
import { Title } from '@angular/platform-browser';
import { GlobalService } from '../../global';

@Component({
  selector: 'my-tag-center',
  styleUrls: ['tagCenter.component.css'],
  templateUrl: './tagCenter.component.html',
  providers: [TagService]
})
export class TagCenterComponent implements OnInit {
    public tagCollection;

    constructor(
        private tagService: TagService,
        private router: Router, 
        private ref: ChangeDetectorRef,
        private titleService: Title,
        private Global: GlobalService
    ) { 
        this.titleService.setTitle('标签 | ' + this.Global.slogan);
        this.tagService.getLatest()
            .subscribe(
                tagCollection => {
                    this.tagCollection = tagCollection;
                    ref.detectChanges();
                },
                err => console.log(err)
            );
    }

    ngOnInit() {}
}
