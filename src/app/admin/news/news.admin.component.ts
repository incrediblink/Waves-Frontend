import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../service/news';
import { ValidationService } from '../../const/validation.service';

@Component({
  selector: 'my-news-admin',
  templateUrl: './news.admin.component.html',
  styleUrls: ['./news.admin.component.scss'],
  providers: [NewsService]
})
export class NewsAdminComponent implements OnInit {
    public tab = {
        addNews: {
            active: true
        },
        newsCue: {
            active: false
        }
    }

    public url;

    public addNews = (url) => {
        this.newsService.add(url)
            .subscribe(
                data => {
                    console.log(data);
                    url = null;
                },
                err => console.log(err)
            )
    }

    public newsCollection = [];

    public domain = (url) => {
        return url.match(/^(?:https?:\/\/)?(‌​?:[^@\/\n]+@)?(?:www\‌​.)?([^:\/\n]+)/im)[2];
    }

    constructor(
        private newsService: NewsService,
        private Validation: ValidationService
    ) { 
        this.newsService.getUnsavedNews()
            .subscribe(
                newsCollection => {
                    this.newsCollection = newsCollection;
                    console.log(this.newsCollection);
                }
            )
    }

    ngOnInit() {
        console.log('Hello news');
    }

}
