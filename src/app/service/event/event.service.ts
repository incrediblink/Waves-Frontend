import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { GlobalService } from '../../global';

import { Observable }     from 'rxjs/Observable';

@Injectable()
export class EventService {
    constructor (private http: Http, private Global: GlobalService) {}

    get (id: string): Observable<{}> {
        return this.http.get(this.Global.api + 'event/' + id)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    getTag (id: string): Observable<{}> {
        return this.http.get(this.Global.api + 'event/' + id + '/tag')
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    create (title: string, news: string): Observable<{}> {
        let eventInfo
        if (news != null)
            eventInfo = { 'title': title, 'news': news };
        else
            eventInfo = { 'title': title };
        eventInfo = JSON.stringify(eventInfo);
        let headers = new Headers({ 'Content-Type': 'text/plain' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.http.post(this.Global.api + 'event/new', eventInfo, options)
                        .map((res: Response) => {
                            return { data: this.extractData(res), status: res.status }
                        })
                        .catch(this.handleError);
    } 

    addNews (id: string, newsUrl: string): Observable<{}> {
        let info = JSON.stringify({
            'url': newsUrl
        });
        let headers = new Headers({ 'Content-Type': 'text/plain' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.http.post(this.Global.api + 'event/' + id + '/news', info, options)
                        .map((res: Response) => {
                            return { data: this.extractData(res), status: res.status }
                        })
                        .catch(this.handleError);
    }

    rejectNews (id: string, news: string): Observable<any> {
        let info = JSON.stringify({
            'news': news
        });
        let headers = new Headers({ 'Content-Type': 'text/plain' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        return this.http.post(this.Global.api + 'event/' + id + '/reject', info, options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    uploadHeaderImage (id: string, imageUrl: string, imageSource: string, sourceUrl: string): Observable<any> {
        let info = JSON.stringify({
            imageUrl: imageUrl,
            imageSource: imageSource,
            sourceUrl: sourceUrl
        });
        let headers = new Headers({ 'Content-Type': 'text/plain' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.http.post(this.Global.api + 'event/' + id + '/image', info, options)
                        .map((res: Response) => {
                            return { data: this.extractData(res), status: res.status }
                        })
                        .catch(this.handleError);
    }

    subscribe (id: string, mode: string, notificationType: string, address: string): Observable<{}> {
        let info = JSON.stringify({
            mode: mode,
            notificationType: notificationType,
            subscriber: address
        });
        let headers = new Headers({ 'Content-Type': 'text/plain' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.http.post(this.Global.api + 'event/' + id + '/subscribe', info, options)
                        .map((res: Response) => {
                            return { data: this.extractData(res), status: res.status }
                        })
                        .catch(this.handleError);
    }

    getQueue (filter): Observable<any> {
        let info = JSON.stringify({
            'filter': filter
        });
        let headers = new Headers({ 'Content-Type': 'text/plain' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.http.post(this.Global.api + 'event/queue', info, options)
                        .map((res: Response) => {
                            return this.extractData(res);
                        })
                        .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
