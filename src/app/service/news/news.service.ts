import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { GlobalService } from '../../global';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class NewsService {
    constructor (private http: Http, private Global: GlobalService) {}

    get (id: Number): Observable<{}> {
        return this.http.get(this.Global.api + 'news/' + id)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    add (url: string): Observable<any> {
        let newsInfo = JSON.stringify({
            'url': url
        });
        let headers = new Headers({ 'Content-Type': 'text/plain' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.http.post(this.Global.api + 'news/add', newsInfo, options)
                        .map((res: Response) => {
                            return this.extractData(res);
                        })
                        .catch(this.handleError);
    }

    addWithoutCrawler (info): Observable<any> {
        info = JSON.stringify(info);
        let headers = new Headers({ 'Content-Type': 'text/plain' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.http.post(this.Global.api + 'news/add/edit', info, options)
                        .map((res: Response) => {
                            return this.extractData(res);
                        })
                        .catch(this.handleError);
    }

    edit (id: string, info: any): Observable<any> {
        let newsInfo = JSON.stringify(info);
        let headers = new Headers({ 'Content-Type': 'text/plain' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.http.post(this.Global.api + 'news/' + id + '/edit', newsInfo, options)
            .map((res: Response) => {
                return { data: this.extractData(res), status: res.status }
            })
            .catch(this.handleError);
    }

    getUnsavedNews (): Observable<any> {
        return this.http.get(this.Global.api + 'news/unsaved')
                        .map(this.extractData)
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
