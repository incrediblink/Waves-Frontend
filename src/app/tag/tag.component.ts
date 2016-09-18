import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { TagService } from '../service/tag';

@Component({
  selector: 'my-tag',
  styleUrls: ['./tag.component.scss'],
  templateUrl: './tag.component.html',
  providers: [ChangeDetectorRef, TagService]
})
export class TagComponent implements OnInit {

    constructor(
            private tagService: TagService,
            private router: Router, 
            private ref: ChangeDetectorRef
        ) { }

    ngOnInit() {
        console.log('Register Component');
    }
}
