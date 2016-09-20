import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { EventService } from '../service/event';
import { TimelineService } from '../service/timeline';
import { GlobalService } from '../global';
import { ValidationService } from '../const/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';

@Component({
  selector: 'my-event',
  styleUrls: ['./event.component.scss'],
  templateUrl: './event.component.html',
  providers: [EventService, TimelineService]
})
export class EventComponent implements OnInit, OnDestroy {

    @ViewChild('childModal') public childModal: ModalDirective;

    public collections: any = [{
      '_id': '',
      'Url': '',
      'Source': '',
      'Title': '',
      'Time': '',
      'Content': '',
      'Abstract': ''
    }];

    public event: any = {
        'Title': '',
        'Subscriber': [],
        'News': [],
        'HeaderImage': {
            'ImageUrl': null,
            'ImageSource': null,
            'SourceUrl': null
        }
    };

    public subscribe: any = {
        situation: '在 …… 的情况下',
        time: '在 …… 之后',
        method: '用何种方式提醒我',
        mode: null,
        notificationType: null,
        address: null,
        select: {
            situation: (option) => {
                this.subscribeMode = option.Options;
                this.subscribe.situation = option.Title;
                this.subscribe.time = '在 …… 之后';
                this.subscribe.mode = null;
            },
            time: (option) => {
                this.subscribe.mode = option.Mode;
                this.subscribe.time = option.Title;
            },
            notificationType: (option) => {
                if (option.Mode != this.subscribe.notificationType) {
                    this.subscribe.address = null;
                    this.subscribe.notificationType = option.Mode;
                    this.subscribe.method = option.Title;
                }
            }
        }
    }

    public subscribeMode = [{ Title: '请选择在何种情况下发出提醒', Mode: null }];

    public subscribeEvent: any = function(modal) {
        this.eventService.subscribe(this.id, this.subscribe.mode, this.subscribe.notificationType, this.subscribe.address)
            .subscribe(
                result => {
                    modal.hide();
                    this.subscribe.situation = '在 …… 的情况下';
                    this.subscribe.time = '在 …… 之后';
                    this.subscribe.method = '用何种方式提醒我';
                    this.subscribe.mode = null;
                    this.subscribe.notificationType = null;
                    this.subscribe.address = null;
                    this.event.Subscriber[this.event.Subscriber.length] = 0;
                    this.ref.detectChanges();
                },
                err => console.log(err)
            );
    }

    public weiboHref: any = function(newsTitle, eventID, eventTitle) {
        window.open('http://widget.weibo.com/dialog/publish.php?button=pubilish&language=zh_cn&default_text=' + newsTitle + ' | ' + eventTitle + ' ' + this.Global.root + eventID, '', 'status=no,menubar=no,titlebar=no,toolbar=no,directories=no, width=600,height=400');
    }

    public twitterHref: any = function(newsTitle, eventID, eventTitle) {
        window.open('https://twitter.com/intent/tweet?text=' + newsTitle + '&hashtags=' + eventTitle + ' ' + this.Global.root + eventID, '', 'status=no,menubar=no,titlebar=no,toolbar=no,directories=no, width=600,height=400');
    }

    public tagCollection;
    
    constructor(
        private eventService: EventService, 
        private timelineService: TimelineService,
        private Global: GlobalService,
        private Validation: ValidationService,
        private ref: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    public sub; public id;

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.eventService.get(this.id)
                .subscribe(
                    result => { 
                        this.event = result; 
                        if (this.event.HeaderImage)
                            this.event.HeaderImage.ImageUrl = this.Global.cdn + this.event.HeaderImage.ImageUrl
                        this.ref.detectChanges();
                    }, 
                    err => console.log(err)
                );
            this.timelineService.get(this.id)
                .subscribe(
                    result => { 
                        this.collections = result; 
                        this.ref.detectChanges(); 
                    }, 
                    err => console.log(err)
                );
            this.eventService.getTag(this.id)
                .subscribe(
                    result => {
                        this.tagCollection = result;
                        this.ref.detectChanges();
                    }
                );
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
