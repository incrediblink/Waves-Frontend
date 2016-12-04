import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { EventService } from '../service/event';
import { NewsService } from '../service/news';
import { TimelineService } from '../service/timeline';
import { GlobalService } from '../global';
import { ValidationService } from '../const/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';
import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';
import { Cookie } from 'ng2-cookies/ng2-cookies';
// import { MetadataService } from 'ng2-metadata';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({
    selector: 'my-event',
    styleUrls: ['event.component.scss'],
    templateUrl: './event.component.html',
    providers: [EventService, NewsService, TimelineService]
})
export class EventComponent implements OnInit, OnDestroy {

    @ViewChild('childModal') public childModal: ModalDirective;

    public collections: any = [];

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
        let loadingID: number;
        let loadingToast: ToastOptions = {
            title: '',
            msg: "正在提交修改请求……",
            showClose: true,
            onAdd: (toast: ToastData) => loadingID = toast.id
        };
        this.toastyService.wait(loadingToast);
        this.newsService.edit(this.idOfNewsToBeEdited, this.newsToBeEdited)
            .subscribe(
                success => {
                    this.toastyService.clear(loadingID);
                    this.toastyService.success('修改成功');
                    this.getTimeline();
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
                    if (option.Mode == 'Email' && this.userInfo.email)
                        this.subscribe.address = this.userInfo.email;
                    if (this.subscribe.notificationType == 'Twitter' && this.userInfo.connect && this.userInfo.connect.Twitter)
                        this.subscribe.address = this.userInfo.connect.Twitter.oAuthToken;
                }
            },
            simpleSubscribe: (option) => {
                this.subscribe.situation = option.Title;
                this.subscribe.mode = option.Mode;
            }
        }
    };

    private switchSubscribeOption = () => {
        this.subscribe.situation = '在 …… 的情况下';
        this.subscribe.time = '在 …… 之后';
        this.subscribe.mode = null;
        this.isSubscribingInASimpleWay = !this.isSubscribingInASimpleWay;
    };

    public subscribeMode = [{ Title: '请选择在何种情况下发出提醒', Mode: null }];

    public subscribeEvent: any = function(modal) {
        let loadingID: number;
        let loadingToast: ToastOptions = {
            title: '',
            msg: "正在提交关注请求……",
            showClose: true,
            onAdd: (toast: ToastData) => {
                loadingID = toast.id;
            }
        };
        this.toastyService.wait(loadingToast);
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
                    this.toastyService.clear(loadingID);
                    this.toastyService.success('订阅成功！');
                    this.ref.detectChanges();
                },
                err => {
                    modal.hide();
                    this.toastyService.clear(loadingID);
                    this.toastyService.error(err);
                    this.ref.detectChanges();
                }
            );
    };

    public submitNews = null;

    public add = {
        url: null,
        time: null,
        content: null,
        source: null,
        title: null,
        abstract: null
    };

    public addNews = (modal, addNewsWithoutCrawlerModal) => {
        let temp = this.submitNews;
        this.submitNews = '正在分析你的链接……';
        this.ref.detectChanges();
        this.newsService.add(temp)
            .subscribe(
                data => {
                    this.eventService.addNews(this.id, data)
                        .subscribe(
                            success => {
                                modal.hide();
                                this.toastyService.success('提交成功！');
                                this.submitNews = null;
                                this.ref.detectChanges();
                            },
                            err => this.toastyService.warning(err)
                        );
                },
                error => {
                    modal.hide();
                    this.submitNews = null;
                    addNewsWithoutCrawlerModal.show();
                }
            );
    };

    public addNewsWithoutCrawler = (modal) => {
        this.newsService.addWithoutCrawler(this.add)
            .subscribe(
                data => {
                    this.eventService.addNews(this.id, data._id)
                        .subscribe(
                            data => {
                                  modal.hide();
                                  this.add = {
                                      url: null,
                                      time: null,
                                      content: null,
                                      source: null,
                                      title: null,
                                      abstract: null
                                  };
                                  this.toastyService.success('提交成功！');
                                  this.ref.detectChanges();
                              },
                              err => this.toastyService.warning(err)
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
                    this.toastyService.success(data);
                }
            );
    };

    public getTime = time => {
        time = new Date(time);
        return time.toLocaleString('zh-CN');
    };

    private userInfo = Cookie.get('waves_user')
        ? JSON.parse(Cookie.get('waves_user'))
        : {};

    private renew = () => {
        setInterval(() => {
            this.userInfo = Cookie.get('waves_user')
                ? JSON.parse(Cookie.get('waves_user'))
                : {};
            if (this.subscribe.notificationType == 'Twitter' && this.userInfo.connect && this.userInfo.connect.Twitter)
                this.subscribe.address = this.userInfo.connect.Twitter.oAuthToken;
        }, 200);
    };

    private isGettingTimeline = 0;
    private getTimeline = () => {
        if (!this.isGettingTimeline) {
            this.opacity = 0;
            this.ref.detectChanges();
            this.isGettingTimeline = 1;
            this.timelineService.get(this.id)
                .subscribe(
                    result => {
                        // this.metadataService.setTag('description', '最新新闻：' + this.collections[0].Source + '《' + this.collections[0].Title + '》' + (this.collections[0].Abstract || ''));
                        setTimeout(() => {
                            this.collections = result;
                            this.ref.detectChanges();
                            setTimeout(() => {
                                this.opacity = 1;
                                this.isGettingTimeline = 0;
                                this.ref.detectChanges();
                            });
                        }, 500);
                    },
                    err => this.router.navigate(['/event'])
                );
        }
    };

    private isFollowButtonShown = true;
    private isSubscribingInASimpleWay = true;

    constructor(
        private eventService: EventService,
        private newsService: NewsService,
        private timelineService: TimelineService,
        private Global: GlobalService,
        private Validation: ValidationService,
        private ref: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router,
        private toastyService: ToastyService,
        private titleService: Title,
        private location: Location
        // private metadataService: MetadataService
    ) {
        if (Cookie.get('waves_permission'))
            this.isAdmin = JSON.parse(Cookie.get('waves_permission')).includes('Admin') ? true : false;
    }

    public sub; public id; public opacity = 0; public isTitleShown = 0;

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.eventService.get(this.id)
                .subscribe(
                    result => {
                        this.event = result;
                        if (this.event.HeaderImage) {
                            this.event.HeaderImage.ImageUrl = this.Global.cdn + this.event.HeaderImage.ImageUrl + '!web';
                            // this.metadataService.setTag('og:image',this.event.HeaderImage.ImageUrl);
                        }
                        this.titleService.setTitle(this.event.Title + ' | ' + this.Global.slogan);
                        // this.metadataService.setTitle(this.event.Title + ' | ' + this.Global.slogan);
                        this.location.go('/event/' + this.event.Title);
                        this.id = this.event._id;
                        this.isTitleShown = this.event.Title;
                        this.ref.detectChanges();
                    },
                    err => {
                        this.toastyService.warning('你所查看的事件不存在或已被隐藏！');
                        this.router.navigate(['/event']);
                    }
                );
            this.getTimeline();
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
