import { Injectable } from '@angular/core';

// let mongoose = require('mongoose');
// console.log(mongoose);
// mongoose.connect('mongodb://localhost/langchao');

let news: Object[] = [
    {
        title: '上门抗议无果 部分百度贴吧代运营商“认栽”',
        abstract: '7月7日，百度发布公告称，停止贴吧代运营合作。此举引起“地区吧”代运营商的强烈不满。上百名地区吧代运营商来到北京，要求与百度谈判。其中一位代运营商对记者说，百度造个大房子，我们进来了，房子漏雨要提前终止合同。那前期我们的装修，投入怎么办？对此，百度方面至今未作回应。',
        time: new Date(1470853849000),
        link: 'http://www.bjnews.com.cn/finance/2016/08/11/413062.html',
        source: '新京报'
    }, {
        title: '李彦宏：魏泽西事件对搜索业务影响有限',
        time: new Date(1469760872000),
        link: 'http://tech.163.com/16/0729/10/BT4TIKNP00097U7R.html',
        source: '网易科技报道'
    }, {
        title: '上门抗议无果 部分百度贴吧代运营商“认栽”',
        abstract: '7月7日，百度发布公告称，停止贴吧代运营合作。此举引起“地区吧”代运营商的强烈不满。上百名地区吧代运营商来到北京，要求与百度谈判。其中一位代运营商对记者说，百度造个大房子，我们进来了，房子漏雨要提前终止合同。那前期我们的装修，投入怎么办？对此，百度方面至今未作回应。',
        time: new Date(1470853849000),
        link: 'http://www.bjnews.com.cn/finance/2016/08/11/413062.html',
        source: '新京报'
    }, {
        title: '李彦宏：魏泽西事件对搜索业务影响有限',
        time: new Date(1469760872000),
        link: 'http://tech.163.com/16/0729/10/BT4TIKNP00097U7R.html',
        source: '网易科技报道'
    }, {
        title: '上门抗议无果 部分百度贴吧代运营商“认栽”',
        abstract: '7月7日，百度发布公告称，停止贴吧代运营合作。此举引起“地区吧”代运营商的强烈不满。上百名地区吧代运营商来到北京，要求与百度谈判。其中一位代运营商对记者说，百度造个大房子，我们进来了，房子漏雨要提前终止合同。那前期我们的装修，投入怎么办？对此，百度方面至今未作回应。',
        time: new Date(1470853849000),
        link: 'http://www.bjnews.com.cn/finance/2016/08/11/413062.html',
        source: '新京报'
    }, {
        title: '李彦宏：魏泽西事件对搜索业务影响有限',
        time: new Date(1469760872000),
        link: 'http://tech.163.com/16/0729/10/BT4TIKNP00097U7R.html',
        source: '网易科技报道'
    }
];

@Injectable()
export class NewsService {
    get(newsID: number): any {
        let returnNews: any = news[newsID];
        returnNews.time = returnNews.time.toLocaleString();
        return returnNews;
    }
}
