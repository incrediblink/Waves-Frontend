export class GlobalService {
    root: string = 'https://' + document.domain + '/';
    api: string = 'https://api.langchao.land:26462/';
    cdn: string = 'https://static.v2land.net/';
    slogan: string = '浪潮 - 渴望重回土地';
    simpleSubscribeMode = [
        {
            Title: '从现在起每周',
            Mode: 'Weekly'
        }, {
            Title: '每当事件有七天没有新的新闻',
            Mode: '7DaysAfterLatestNews'
        }
    ];
    subscribeMode = [
        {
            Title: '从现在起',
            Options: [
                { Title: '一天后', Mode: 'OneDay' },
                { Title: '一周后', Mode: 'OneWeek' },
                { Title: '一个月后', Mode: 'OneMonth' }
            ]
        }, {
            Title: '从现在起每 ……',
            Options: [
                { Title: '每天', Mode: 'Daily' },
                { Title: '每周', Mode: 'Weekly' },
                { Title: '每个月', Mode: 'Monthly' },
                { Title: '每当有新的新闻', Mode: 'EveryNewNews' }
            ]
        }, {
            Title: '每当事件有 …… 日没有新闻更新',
            Options: [
                { Title: '一天没有新的新闻', Mode: '1DayAfterLatestNews' },
                { Title: '一周没有新的新闻', Mode: '7DaysAfterLatestNews' },
                { Title: '一个月没有新的新闻', Mode: '30DaysAfterLatestNews' }
            ]
        }
    ];
    notificationType = [
        {
            Title: '用邮件提醒我',
            Mode: 'Email',
            Permission: {
                LoginRequired: false,
                message: null
            }
        }, {
            Title: '用我的账号在 Twitter 上发推',
            Mode: 'Twitter',
            Permission: {
                LoginRequired: false,
                message: null
            }
        }
    ];
}
