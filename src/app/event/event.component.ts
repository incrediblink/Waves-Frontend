import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { EventService } from '../service/event';
import { NewsService } from '../service/news';
import { TimelineService } from '../service/timeline';
import { GlobalService } from '../global';
import { ValidationService } from '../const/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';
import { AlertService } from '../service/alert';
import { CookieService } from 'angular2-cookie/core';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({
  selector: 'my-event',
  styleUrls: ['./event.component.scss'],
  templateUrl: './event.component.html',
  providers: [EventService, NewsService, TimelineService]
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
        },
        'Tag': []
    };

    public newsToBeEditedOrig: any = {
        Title: '',
        Abstract: '',
        Time: '',
        Url: '',
        Source: ''
    };

    public newsToBeEdited: any = this.newsToBeEditedOrig;

    public idOfNewsToBeEdited: any = '';

    public editNewsCall: any = (news, modal) => {
        this.newsToBeEdited = {
            Title: news.Title,
            Abstract: news.Abstract,
            Time: news.Time.toString(),
            Url: news.Url,
            Source: news.Source
        };
        this.idOfNewsToBeEdited = news._id;
        modal.show();
    };

    public editNews: any = (modal) => {
        this.newsService.edit(this.idOfNewsToBeEdited, this.newsToBeEdited)
            .subscribe(
                success => {
                    this.alertService.push('修改成功，若要查看最新新闻内容请刷新页面。', 'success');
                    modal.hide();
                    this.newsToBeEdited = this.newsToBeEditedOrig;
                },
                error => {
                    console.log(error);
                }
            );
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
    };

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
                    this.alertService.push('订阅成功！', 'success');
                    this.ref.detectChanges();
                },
                err => console.log(err)
            );
    };

    public addOrig = {
        url: '',
        time: '',
        content: '',
        source: '',
        title: '',
        abstract: ''
    };

    public add = this.addOrig;

    public addNews = (modal) => {
        this.newsService.addWithoutCrawler(this.add)
            .subscribe(
                data => {
                    this.eventService.addNews(this.id, data._id)
                        .subscribe(
                            data => {
                                modal.hide();
                                this.add = this.addOrig;
                                this.alertService.push('提交成功！', 'success');
                                this.ref.detectChanges();
                            },
                            err => this.alertService.push(err, 'warning')
                        );
                }
            );
    };

    public weiboHref: any = function(newsTitle, eventID, eventTitle) {
        window.open('http://widget.weibo.com/dialog/publish.php?button=pubilish&language=zh_cn&default_text=' + newsTitle + ' | ' + eventTitle + ' ' + this.Global.root + 'event/' + eventID, '', 'status=no,menubar=no,titlebar=no,toolbar=no,directories=no, width=600,height=400');
    };

    public twitterHref: any = function(newsTitle, eventID, eventTitle) {
        window.open('https://twitter.com/intent/tweet?text=' + newsTitle + '&hashtags=' + eventTitle + ' ' + this.Global.root + 'event/' + eventID, '', 'status=no,menubar=no,titlebar=no,toolbar=no,directories=no, width=600,height=400');
    };

    private isAdmin = false;

    public removeNews = (news, i) => {
        this.eventService.removeNews(this.id, news)
            .subscribe(
                data => {
                    this.collections.splice(i, 1);
                    this.alertService.push(data, 'success');
                }
            );
    };

    public getTime = time => {
        time = new Date(time);
        return time.toLocaleString('zh-CN');
    }

    constructor(
        private eventService: EventService,
        private newsService: NewsService,
        private timelineService: TimelineService,
        private Global: GlobalService,
        private Validation: ValidationService,
        private ref: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private cookieService: CookieService,
        private titleService: Title,
        private location: Location
    ) {
        if (this.cookieService.get('waves_permission'))
            this.isAdmin = JSON.parse(this.cookieService.get('waves_permission')).includes('Admin') ? true : false;
    }

    public sub; public id;

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.eventService.get(this.id)
                .subscribe(
                    result => {
                        this.event = result;
                        if (this.event.HeaderImage)
                            this.event.HeaderImage.ImageUrl = this.Global.cdn + this.event.HeaderImage.ImageUrl + '!web';
                        this.titleService.setTitle(this.event.Title + ' | ' + this.Global.slogan);
                        this.location.go('/event/' + this.event.Title);
                        this.id = this.event._id;
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
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
