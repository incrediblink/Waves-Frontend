import { Injectable } from '@angular/core';
import { GlobalService } from '../../global';

@Injectable()
export class UploadService {
    constructor(private Global: GlobalService) { }

    upload = (file: any) => {
        return new Promise((resolve, reject) => {
            let xmlHttp = new XMLHttpRequest();
            let form = new FormData();
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 201) {
                    let result = JSON.parse(xmlHttp.responseText).data;
                    resolve(result);
                }
            }
            form.append('file', file);
            xmlHttp.open('POST', this.Global.api + 'upload', true);
            xmlHttp.send(form);
        });
    }
}