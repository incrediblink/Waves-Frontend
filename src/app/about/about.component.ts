import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'my-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

    public resizeIframe = (obj) => {
      console.log(obj.contentWindow.document.body.scrollHeight);
      obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
    }

    constructor(
        private titleService: Title
    ) {
        this.titleService.setTitle('关于浪潮');
    }

}
