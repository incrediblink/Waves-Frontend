import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { GlobalService } from '../../global';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class OauthService {
    constructor (private http: Http, private Global: GlobalService) {}

    disconnectTwitter (): Observable<any> {
        let options = new RequestOptions({ withCredentials: true });
        return this.http.get(this.Global.api + 'oauth/twitter/annul', options)
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
