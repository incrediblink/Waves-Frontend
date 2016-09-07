import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { EventService } from '../service/event';
import { TimelineService } from '../service/timeline';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'my-event',
  styleUrls: ['./event.component.scss'],
  templateUrl: './event.component.html',
  providers: [EventService, TimelineService]
})
export class EventComponent implements OnInit, OnDestroy {

    public collections: any = [
    {
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
        'Subcriber': [],
        'News': []
    };

    public image: any = {
        url: 'img/8421ac1d5a4e964973f6e0e80d2de277.jpg',
        news: 'http://www.bjnews.com.cn/finance/2016/08/11/413062.html',
        source: '新京报'
    };

    public weiboHref: any = function(newsTitle, eventID, eventTitle) {
        window.open('http://widget.weibo.com/dialog/publish.php?button=pubilish&language=zh_cn&default_text=' + newsTitle + ' | ' + eventTitle + ' http://localhost:8080/' + eventID, '', 'status=no,menubar=no,titlebar=no,toolbar=no,directories=no, width=600,height=400');
    }

    public twitterHref: any = function(newsTitle, eventID, eventTitle) {
        window.open('https://twitter.com/intent/tweet?text=' + newsTitle + '&hashtags=' + eventTitle + ' http://localhost:8080/' + eventID, '', 'status=no,menubar=no,titlebar=no,toolbar=no,directories=no, width=600,height=400');
    }
    
    constructor(
        private eventService: EventService, 
        private timelineService: TimelineService, 
        private ref: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    public sub;

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = params['id'];
            this.eventService.get(id)
                .subscribe(result => { this.event = result; this.ref.detectChanges(); }, err => console.log(err));
            this.timelineService.get(id)
                .subscribe(result => { this.collections = result; this.ref.detectChanges(); }, err => console.log(err));
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
