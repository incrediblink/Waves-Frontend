import { Injectable } from '@angular/core';
import { NewsService } from '../news';

let newsCollect: string[][] = [
    ['57bff400305a5e801ec1bc98']
];

@Injectable()
export class TimelineService {
    errorMessage: string;
    constructor(private newsService: NewsService) { }

    private getCollection(eventID: number): any {
        return newsCollect[eventID];
    }

    get(eventID: number): any {
        return new Promise((resolve, reject) => {
            let collection = this.getCollection(eventID);
            for (let i = 0; i < collection.length; i++) {
                this.newsService
                    .get(collection[i])
                    .subscribe(
                        news => { 
                            console.log(news)
                            collection[i] = news;
                            if (i === collection.length - 1)
                                resolve(collection);
                        },
                        error => this.errorMessage = <any>error
                    );
            }
        });
    }
}
