import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EventService } from '../service/event';
import { TimelineService } from '../service/timeline';

@Component({
  selector: 'my-event',
  styleUrls: ['./event.component.scss'],
  templateUrl: './event.component.html',
  providers: [EventService, TimelineService]
})
export class EventComponent implements OnInit {

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
    public weiboHref: any = function(newsTitle, eventTitle) {
        window.open('http://widget.weibo.com/dialog/publish.php?button=pubilish&language=zh_cn&default_text=' + newsTitle + ' | ' + eventTitle, '', 'status=no,menubar=no,titlebar=no,toolbar=no,directories=no, width=600,height=400, top=0, left=0');
    }
    public twitterHref: any = function(newsTitle, eventTitle) {
        window.open('https://twitter.com/intent/tweet?text=' + newsTitle + '&hashtags=' + eventTitle, '', 'status=no,menubar=no,titlebar=no,toolbar=no,directories=no, width=600,height=400, top=0, left=0');
    }
    constructor(private eventService: EventService, private timelineService: TimelineService, private ref: ChangeDetectorRef) {
        this.eventService.get('57c9835db6fd249422831b3d')
            .subscribe(result => { this.event = result; this.ref.detectChanges(); }, err => console.log(err));
        this.timelineService.get('57c9835db6fd249422831b3d')
            .subscribe(result => { this.collections = result; console.log(this.collections[0].Time.toLocaleString()); this.ref.detectChanges(); }, err => console.log(err));
    }

    ngOnInit() {
        console.log('Event Component');
    }
}
