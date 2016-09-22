import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EventService } from '../../service/event';
import { NewsService } from '../../service/news';
import { UploadService } from '../../service/upload';
import { AlertService } from '../../service/alert';
import { ValidationService } from '../../const/validation.service';

@Component({
  selector: 'my-event-admin',
  templateUrl: './event.admin.component.html',
  styleUrls: ['./event.admin.component.scss'],
  providers: [EventService, UploadService, NewsService]
})
export class EventAdminComponent implements OnInit {

    public tab = {
        addEvent: {
            active: true
        },
        addNews: {
            active: false
        },
        uploadImage: {
            active: false
        },
        verifyNews: {
            active: false
        }
    };

    public create = {
        title: null,
        news: null
    }

    public createEvent = (title, news) => {
        this.eventService.create(title, news)
            .subscribe(
                data => {
                    this.create.title = null;
                    this.create.news = null;
                },
                err => console.log(err)
            )
    }

    public add = {
        id: null,
        url: null
    }

    public uploadImageOrig = {
        id: null,
        image: null,
        url: null,
        source: null
    }

    public uploadImage = this.uploadImageOrig;
    
    public addNews = (id, url, i) => {
        if (this.Validation.EventID.test(url) || this.Validation.Url.test(url))
            this.eventService.addNews(id, url)
                .subscribe(
                    data => {
                        this.add.id = null;
                        this.add.url = null;
                        if (i)
                            this.queue.splice(i, 1);
                    },
                    err => this.alertService.push(err, 'warning')
                );
    }

    public upload = (id: string, imageSource: string, sourceUrl: string) => {
        let file = document.getElementById('image').files[0];
        this.uploadService.upload(file)
            .then(result => {
                this.eventService.uploadHeaderImage(id, result.data.Key, imageSource, sourceUrl)
                    .subscribe(
                        data => {
                            this.uploadImage = this.uploadImageOrig;
                        }
                    );
            });
    }

    public verify = {
        id: null
    };

    public filter; public queue = [];

    public getQueue = () => {
        if (this.verify.id)
            this.filter = { Event: this.verify.id }
        this.eventService.getQueue(this.filter)
            .subscribe(
                result => {
                    this.queue = result;
                    this.ref.detectChanges();
                }
            );
    }

    public rejectNews = (id, news, i) => {
        this.eventService.rejectNews(id, news)
            .subscribe(
                result => {
                    this.alertService.push(result, 'success');
                    this.queue.splice(i, 1);
                }
            );
    }

    constructor(
        private eventService: EventService, 
        private newsService: NewsService,
        private uploadService: UploadService,
        private alertService: AlertService,
        private Validation: ValidationService,
        private ref: ChangeDetectorRef 
    ) {
        this.getQueue();
    }

    ngOnInit() {
    }

}
