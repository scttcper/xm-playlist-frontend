import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { matchesProperty } from 'lodash-es';
import { channels, Channel } from '../channels';

@Component({
  selector: 'xm-station',
  template: `
  <nav class="navbar navbar-expand-md navbar-light bg-light mb-3">
    <div class="container">
      <a class="navbar-brand" routerLink="./">{{ channel?.name }}</a>
      <button class="navbar-toggler" type="button"
        aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation"
        (click)="isCollapsed = !isCollapsed">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" [ngbCollapse]="isCollapsed">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" routerLink="./" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            Stream
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="./latest" routerLinkActive="active">
            Newest
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="./popular" routerLinkActive="active">
            Popular
          </a>
        <!-- </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Popular</a>
        </li> -->
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" [href]="spotifyLink" target="_blank">
            <i class="fab fa-spotify" aria-hidden="true"></i> Listen On Spotify
          </a>
        </li>
      </ul>
      </div>
    </div>
  </nav>
  <router-outlet></router-outlet>
  `,
  styles: [
    `
    .container {
      padding-right: 15px;
      padding-left: 15px;
    }
  `,
  ],
})
export class StationComponent implements OnInit {
  channel: Channel;
  spotifyLink: string;
  isCollapsed = true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.channel = channels.find(
        matchesProperty('id', params['channelName']),
      );
      this.spotifyLink = `https://open.spotify.com/user/xmplaylist/playlist/${
        this.channel.playlist
      }`;
    });
  }
}
