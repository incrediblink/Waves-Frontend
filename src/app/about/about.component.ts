import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    public resizeIframe = (obj) => {
      console.log(obj.contentWindow.document.body.scrollHeight);
      obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
    }

    constructor() {
      // Do stuff
    }

    ngOnInit() {
      console.log('Hello About');
    }

}
