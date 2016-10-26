import { Component, OnDestroy, Input, OnChanges } from '@angular/core';
const ms = require('ms');

@Component({
  selector: 'time-since',
  template: `{{ timeSince }} ago`,
})
export class TimeSinceComponent implements OnDestroy, OnChanges {
  @Input() date: string;
  private past: Date;
  private change: number;
  private timeSince: string;
  private timeout: any;

  ngOnChanges() {
    clearTimeout(this.timeout);
    this.past = new Date(this.date);
    this.format();
  }
  ngOnDestroy() {
    clearTimeout(this.timeout);
  }
  timeoutSetup() {
    let next;
    if (this.timeSince.indexOf('minute') !== -1) {
      next = 10000;
    } else {
      next = 100000;
    }
    this.timeout = setTimeout(() => this.format(), next);
  }
  format() {
    let now = +new Date();
    this.change = now - (+this.past);
    let res = ms(this.change, {long: true});
    if (res.indexOf('ms') !== -1 || res.indexOf('second') !== -1) {
      this.timeSince = '1 minute';
    } else {
      this.timeSince = res;
    }
    this.timeoutSetup();
  }
}
