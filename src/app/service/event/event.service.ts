import { Injectable } from '@angular/core';

let event: Array<any> = [
    {
        title: '百度魏泽西事件',
        detail: '魏则西，男，二十一岁，生前就读于西安电子科技大学，计算机专业学生，因身患滑膜肉瘤去世。',
        time: '2016年8月10日23:41:28',
        image: 'img/8421ac1d5a4e964973f6e0e80d2de277.jpg',
        follower: 15,
        tag: ['百度', '网络广告', '医疗', '莆田系']
    }
];

@Injectable()
export class EventService {
    getDetail(number: number): any {
        return event[number];
    }
}