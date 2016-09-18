import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {
    public alerts: Array<Object> = [];

    push = (msg, type) => {
        this.alerts.push({
            msg: msg, 
            type: type, 
            closable: true
        });
    }

    get = () => { return this.alerts; }

    constructor () { }
}
