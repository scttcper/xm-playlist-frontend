import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Api } from '../api';
import { Play } from '../app.interfaces';
import { Spotify } from '../app.interfaces';

@Component({
  selector: 'xm-links',
  template: `
  <div class="links m-2">
    <a [routerLink]="['/station', channel, 'track', trackId]" *ngIf="!hideTrack" class="btn btn-secondary info" role="button">
      <i class="fa fa-info-circle"></i>
    </a>
    <!--
    <a [href]="hypem" target="_blank" class="btn btn-secondary hypem" role="button">
      <i class="fa fa-heart"></i>
    </a>
    -->
    <a [href]="youtube" target="_blank" class="btn btn-secondary youtube" role="button">
      <i class="fa fa-youtube-play"></i>
    </a>
    <a [href]="spotifyLink" *ngIf="spotifyLink" target="_blank" class="btn btn-secondary spotify" role="button">
      <i class="fa fa-spotify"></i>
    </a>
  </div>
  `,
  styles: [`
  .btn-secondary {
    border-color: #fff;
  }
  .youtube:hover {
    background-color: #e52d27;
  }
  .hypem:hover {
    background-color: #83c441;
  }
  .spotify:hover {
    background-color: #1ED760;
  }
  .btn:hover {
    box-shadow: 8px 14px 38px rgba(39,44,49,.06), 1px 3px 8px rgba(39,44,49,.03);
    transform: scale(0.9);
  }
  `]
})
export class LinksComponent implements OnInit {
  @Input() trackId: number;
  @Input() name: string;
  @Input() artists: any[];
  @Input() hideTrack: boolean;
  @Input() spotify: Spotify;
  youtube = '';
  hypem = '';
  spotifyLink = '';
  channel = '';

  constructor(
    private api: Api,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.router.parent.params.subscribe((n) => this.channel = n['channelName']);
    const artists = this.artists.map(n => n.name);
    const str = this.name.replace(/[\s\/()]/g, '+') + '+' + artists.join('+').replace(/[\s\/()]/g, '+');
    this.hypem = `http://hypem.com/search/${str}/1/?sortby=favorite`;
    this.youtube = `https://www.youtube.com/results?search_query=${str}`;
    if (this.spotify) {
      this.spotifyLink = `https://open.spotify.com/track/${this.spotify.id}`;
    }
  }

}
