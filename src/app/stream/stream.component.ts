import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { last, matchesProperty } from 'lodash-es';
import { channels, Channel } from '../channels';

import { Api } from '../api';
import { Play } from '../app.interfaces';

@Component({
  selector: 'xm-stream',
  templateUrl: './stream.component.html',
})
export class StreamComponent implements OnInit {
  plays: Play[] = [];
  end = false;
  channel: Channel;

  loading = false;
  private page = 0;
  private lastLoaded: Play;

  constructor(
    private api: Api,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta,
  ) {}

  ngOnInit() {
    this.meta.updateTag({ id: 'og:url', url: window.location.href });
    this.meta.updateTag({
      id: 'og:description',
      content: `
    Recently played tracks on sirius xm and xm radio.
    Spotify playlist automatically updated.
    `,
    });
    this.route.params.subscribe(params => {
      // get segment id from route
      this.end = false;
      this.plays = [];
      this.getRecentPage(params.channelName);
      const chan = channels.find(matchesProperty('id', params.channelName));
      this.channel = chan;
      this.title.setTitle(`${chan.name} recently played - xmplaylist.com`);
      this.meta.updateTag({
        id: 'og:title',
        content: `${chan.name} recently played`,
      });
      this.meta.updateTag({
        id: 'og:image',
        url: `/assets/img/${chan.id}.png`,
      });
    });
  }
  getRecentPage(channelName: string) {
    if (this.loading || this.end) {
      return;
    }
    this.loading = true;
    this.api.getChannel(channelName, this.lastLoaded).subscribe(recent => {
      this.plays.push(...recent);
      if (recent.length === 0) {
        this.end = true;
      }
      this.lastLoaded = last(recent);
      this.loading = false;
    });
  }
  onScroll() {
    this.page = this.page + 1;
    this.getRecentPage(this.channel.id);
  }
  trackById(index, item) {
    return item.id;
  }
}
