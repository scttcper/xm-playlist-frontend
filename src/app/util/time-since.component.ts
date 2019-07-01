import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { differenceInDays, formatDistance } from 'date-fns';

@Component({
  selector: 'xm-time-since',
  template: `{{ timeSince }} ago`,
})
export class TimeSinceComponent implements OnDestroy, OnChanges {
  @Input() date: string;
  timeSince: string;
  private past: any;
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
    if (this.timeSince.includes('minute')) {
      next = 10000;
    } else {
      next = 100000;
    }
    this.timeout = setTimeout(() => this.format(), next);
  }
  format() {
    const res = formatDistance(new Date(), this.past);
    if (res.includes('ms') || res.includes('second')) {
      this.timeSince = '1 minute';
    } else {
      this.timeSince = res;
    }
    if (differenceInDays(new Date(), this.date) < 1) {
      this.timeoutSetup();
    }
  }
}
