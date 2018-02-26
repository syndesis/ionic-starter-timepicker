import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

interface Coordinate {
    x: number;
    y: number;
}

@IonicPage()
@Component({
    selector: 'page-time-picker',
    templateUrl: 'time-picker.html'
})
export class TimePickerPage {
    @ViewChild('hourClock') hourClock;
    @ViewChild('minuteClock') minuteClock;
    hour: string;
    minute: string;
    ampm: string;
    selecting = 'hour';
    hourHandStyle: Object;
    minuteHandStyle: Object;
    hours: Array<string> = [
        '9',
        '10',
        '11',
        '12',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8'
    ];
    minutes: Array<string> = [
        '45',
        '50',
        '55',
        '00',
        '05',
        '10',
        '15',
        '20',
        '25',
        '30',
        '35',
        '40'
    ];

    constructor(
        private navParams: NavParams,
        private viewController: ViewController
    ) {}

    getHour(angle) {
        const index = Math.round(angle / 30);
        if (index > -1 || index === -6) {
            this.hour = this.hours[Math.abs(index)];
            this.hourHandStyle = {
                '-webkit-transform': `rotate(${Math.abs(index) * 30 - 90}deg)`,
                '-moz-transform': `rotate(${Math.abs(index) * 30 - 90}deg)`,
                transform: `rotate(${Math.abs(index) * 30 - 90}deg)`
            };
        } else {
            this.hour = this.hours[12 - Math.abs(index)];
            this.hourHandStyle = {
                '-webkit-transform': `rotate(${(12 - Math.abs(index)) * 30 -
                    90}deg)`,
                '-moz-transform': `rotate(${(12 - Math.abs(index)) * 30 -
                    90}deg)`,
                transform: `rotate(${(12 - Math.abs(index)) * 30 - 90}deg)`
            };
        }
        this.selecting = 'minute';
    }

    getMinute(angle) {
        const index = Math.round(angle / 30);
        if (index > -1 || index === -6) {
            this.minute = this.minutes[Math.abs(index)];
            this.minuteHandStyle = {
                '-webkit-transform': `rotate(${Math.abs(index) * 30 - 90}deg)`,
                '-moz-transform': `rotate(${Math.abs(index) * 30 - 90}deg)`,
                transform: `rotate(${Math.abs(index) * 30 - 90}deg)`
            };
        } else {
            this.minute = this.minutes[12 - Math.abs(index)];
            this.minuteHandStyle = {
                '-webkit-transform': `rotate(${(12 - Math.abs(index)) * 30 -
                    90}deg)`,
                '-moz-transform': `rotate(${(12 - Math.abs(index)) * 30 -
                    90}deg)`,
                transform: `rotate(${(12 - Math.abs(index)) * 30 - 90}deg)`
            };
        }
    }

    tappedClock(event) {
        const clicked: Coordinate = {
            x: event.clientX,
            y: event.clientY
        };
        const clock =
            this.selecting === 'hour' ? this.hourClock : this.minuteClock;
        const rectangle = clock.nativeElement.getBoundingClientRect();
        const clockCenter: Coordinate = {
            x: rectangle.width / 2 + rectangle.left,
            y: rectangle.height / 2 + rectangle.top
        };
        const angle =
            Math.atan2(clockCenter.y - clicked.y, clockCenter.x - clicked.x) *
            180 /
            Math.PI;

        if (this.selecting === 'hour') {
            this.getHour(angle);
        } else {
            this.getMinute(angle);
        }
    }

    cancel() {
        this.viewController.dismiss();
    }

    dismiss() {
        this.viewController.dismiss(`${this.hour}:${this.minute} ${this.ampm}`);
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewDidLoad() {
        const time = this.navParams.get('time');
        try {
            this.hour = time.match(/(\d+):/)[1];
            this.minute = time.match(/:(\d+)/)[1];
            this.ampm = time.match(/([AP]M)/)[1];
        } catch (error) {
            console.log('error: ', error);
            this.hour = '6';
            this.minute = '00';
            this.ampm = 'PM';
        }
        const hourAngle = this.hours.indexOf(this.hour) * 30 - 90;
        const minuteAngle = this.minutes.indexOf(this.minute) * 30 - 90;
        this.hourHandStyle = {
            '-webkit-transform': `rotate(${hourAngle}deg)`,
            '-moz-transform': `rotate(${hourAngle}deg)`,
            transform: `rotate(${hourAngle}deg)`
        };
        this.minuteHandStyle = {
            '-webkit-transform': `rotate(${minuteAngle}deg)`,
            '-moz-transform': `rotate(${minuteAngle}deg)`,
            transform: `rotate(${minuteAngle}deg)`
        };
    }
}
