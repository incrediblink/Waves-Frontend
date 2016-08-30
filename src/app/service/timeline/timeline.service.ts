import { Injectable } from '@angular/core';
import { NewsService } from '../news';

let newsCollect: number[][] = [
    [0, 1, 2, 3, 4, 5]
];

let counter = 0;

@Injectable()
export class TimelineService {
    constructor(private newsService: NewsService) { }

    private getCollection(eventID: number): any {
        function sorting(a: number, b: number): any {
            return b - a;
        }
        return newsCollect[eventID].sort(sorting);
    }

    get(eventID: number): any {
        let collection = this.getCollection(eventID);
        for (let news of collection) {
            let info = this.newsService.get(news);
            collection[counter++] = info;
        }
        return collection;
    }
}
