import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';

import { Api } from '../api';
import { Channel } from '../app.interfaces';


@Component({
  selector: 'xm-station',
  template: `
  <xm-nav></xm-nav>
  <nav class="navbar navbar-light bg-faded navbar-toggleable mb-3">
    <div class="container">
      <a class="navbar-brand" routerLink="./">{{channel?.name}}</a>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" routerLink="./" routerLinkActive="active">Stream</a>
        </li>
        <!-- <li class="nav-item">
          <a class="nav-link" href="#">Latest</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Popular</a>
        </li> -->
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" [href]="spotifyLink" target="_blank">
            <i class="fa fa-spotify" aria-hidden="true"></i> Listen On Spotify
          </a>
        </li>
      </ul>
    </div>
  </nav>
  <router-outlet></router-outlet>
  `,
  styles: []
})
export class StationComponent implements OnInit {
  channel: Channel;
  spotifyLink: string;

  constructor(
    private api: Api,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.api.getChannels()
        .subscribe((res) => {
          const chan = _.find(res, _.matchesProperty('id', params['channelName']));
          this.channel = chan;
          this.spotifyLink = `https://open.spotify.com/user/xmplaylist/playlist/${chan.playlist}`;
        });
    });
  }

}
