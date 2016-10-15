export class ValidationService {
    Username: RegExp = /^[a-zA-Z0-9]{5,20}$/;
    Password: RegExp = /^[a-zA-Z0-9!@#$%^&*()_+-=`~\\|,.<>'"]{6,32}$/;
    Email: RegExp = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    Twitter: RegExp = /^[a-zA-Z0-9]{5,32}$/;
    Time: any = {
        test: (time) => {
            time = new Date(time);
            return (time != 'Invalid Date');
        }
    };

    EventID: RegExp = /^[a-zA-Z0-9]{24}$/;
    Url: RegExp = /^http(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*‌​)*(\/?)([a-zA-Z0-9\-‌​\.\?\,\'\/\\\+&amp;%‌​\$#_]*)?$/;
}
