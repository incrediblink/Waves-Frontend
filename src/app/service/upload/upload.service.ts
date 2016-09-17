import { Injectable } from '@angular/core';

@Injectable()
export class UploadService {
    constructor() { }

    upload = (file: any) => {
        return new Promise((resolve, reject) => {
            let xmlHttp = new XMLHttpRequest();
            let form = new FormData();
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 201)
                    resolve(JSON.parse(xmlHttp.responseText));
            }
            form.append('file', file);
            xmlHttp.open('POST', 'http://localhost:3080/upload', true);
            xmlHttp.send(form);
        });
    }
}