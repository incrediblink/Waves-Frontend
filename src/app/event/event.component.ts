import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-event',
  styleUrls: ['./event.component.scss'],
  templateUrl: './event.component.html',
})
export class EventComponent implements OnInit {

    constructor() {
        // Do stuff
    }

    ngOnInit() {
        console.log('Event Component');
    }

    public collections: Array<any> = [
        {
            title: "迟迟笑了",
            abstract: "拿到商家拿来封口的 1TB 硬盘后，迟迟笑了",
            time: "2016年8月8日10:51:14",
            link: "cn.niuyaotimes.com",
            source: "扭腰时报中文网"
        },{
            title: "惨！豆蔻少年网上购买 U 盘收到后发现是纸糊的！",
            time: "2016年8月7日10:52:49",
            link: "renming.com",
            source: "人名日报"
        }
    ];
}