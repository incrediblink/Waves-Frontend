import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { GlobalService } from '../../global';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegisterService {
    constructor (private http: Http, private Global: GlobalService) {}

    register (username, password, email): Observable<any> {
        let userInfo = JSON.stringify({
            'username': username,
            'password': password,
            'email': email
        });
        let headers = new Headers({ 'Content-Type': 'text/plain' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.http.post(this.Global.api + 'user/register', userInfo, options)
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
        let errMsg = error.json().data;
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
