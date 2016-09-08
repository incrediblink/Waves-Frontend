import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';

@Injectable()
export class EventService {
    constructor (private http: Http) {}

    get (id: string): Observable<{}> {
        return this.http.get('http://localhost:3080/event/' + id)
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

        return this.http.post('http://localhost:3080/event/new', eventInfo, options)
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

        return this.http.post('http://localhost:3080/event/' + id + '/news', info, options)
                        .map((res: Response) => {
                            return { data: this.extractData(res), status: res.status }
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
