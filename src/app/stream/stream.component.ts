import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';

import { Api } from '../api';
import { Channel } from '../channel';
import { Stream } from '../stream';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit, OnDestroy {

  channels: Channel[];
  recent: Stream[];

  private sub: Subscription;

  constructor(
    private api: Api,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    this.api.getChannels().then((channels => this.channels = channels));
    this.sub = this.route.params.subscribe((params: Params) => {
      // get segment id from route
      let channelName = params['channelName'];
      this.api.getRecent(channelName).then((recent => this.recent = recent));
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
