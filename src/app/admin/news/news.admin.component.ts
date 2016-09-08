import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../service/news';

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

    constructor(private newsService: NewsService) {
        // Do stuff
    }

    ngOnInit() {
        console.log('Hello news');
    }

}
