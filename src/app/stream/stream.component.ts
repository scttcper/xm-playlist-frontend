import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { Api } from '../api';
import { Channel, Play } from '../app.interfaces';

@Component({
  selector: 'xm-stream',
  templateUrl: './stream.component.html',
})
export class StreamComponent implements OnInit {
  channels: Observable<Channel[]>;
  streams: Play[][];
  mostHeard: Play;
  mostTimesHeard: number;
  unique: number;
  total: number;
  end = false;

  private page = 0;
  private loading = false;
  private lastLoaded: Play;
  private oldChannel = '';

  constructor(
    private api: Api,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    this.channels = this.api.getChannels();
    this.route.params.subscribe((params) => {
      // get segment id from route
      this.end = false;
      const channelName = params['channelName'];
      if (channelName !== this.oldChannel) {
        this.streams = [];
        this.oldChannel = channelName;
      }
      this.api.currentChannel.next(channelName);
      this.getRecentPage();
      this.api.mostHeard(channelName).subscribe((res) => {
        this.unique = res.length;
        this.total = _.sumBy(res, 'playCount');
        this.mostHeard = res[0];
      });
      this.api.getChannels()
        .subscribe((res) => {
          const chan = _.find(res, _.matchesProperty('id', channelName))
          this.title.setTitle(`channel: ${chan.name}`);
        })
    });
  }
  getRecentPage() {
    if (this.loading || this.end) {
      return;
    }
    this.loading = true;
    const channel = this.api.currentChannel.getValue();
    this.api
      .getRecent(channel, this.lastLoaded)
      .subscribe((recent) => {
        this.streams.push(recent);
        if (recent.length === 0) {
          this.end = true;
        }
        this.lastLoaded = _.last(recent);
        this.loading = false;
      });
  }
  onScroll() {
    this.page = this.page + 1;
    this.getRecentPage();
  }

}
