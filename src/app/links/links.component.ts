import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Spotify } from '../app.interfaces';

@Component({
  selector: 'xm-links',
  template: `
  <div class="links m-2">
    <a [routerLink]="['/station', channel, 'track', trackId]"
      *ngIf="!hideTrack" class="btn btn-default info mr-1" role="button">
      <i class="fas fa-info-circle"></i>
    </a>
    <!--
    <a [href]="hypem" target="_blank" class="btn btn-default hypem" role="button">
      <i class="fa fa-heart"></i>
    </a>
    <a [href]="youtube" target="_blank" class="btn btn-default youtube mr-1" role="button">
      <i class="fab fa-youtube"></i>
    </a>
    -->
    <a [href]="spotifyLink" *ngIf="spotifyLink" target="_blank"
      class="btn btn-default spotify mr-1" role="button">
      <i class="fab fa-spotify"></i>
    </a>
    <a [href]="songwhipLink" *ngIf="songwhipLink" target="_blank"
      class="btn btn-default songwhip mr-1" role="button">
      <i class="fa fa-music"></i>
    </a>
  </div>
  `,
  styles: [
    `
  .btn-default {
    color: #33485a;
    border-color: #eeeeee;
  }
  .btn-default:hover {
    background-color: #000000;
    border-color: #ffffff;
    color: #ffffff;
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
  .songwhip:hover {
    background-color: #F13383;
  }
  `,
  ],
})
export class LinksComponent implements OnInit {
  @Input() trackId: number;
  @Input() name: string;
  @Input() artists: any[];
  @Input() hideTrack: boolean;
  @Input() spotify: Spotify;
  @Input() songwhipLink: string;
  youtube = '';
  hypem = '';
  spotifyLink = '';
  channel = '';

  constructor(private router: ActivatedRoute) {}

  ngOnInit() {
    this.router.parent.params.subscribe(n => (this.channel = n.channelName));
    const artists = this.artists.map(n => n.name);
    const str =
      this.name.replace(/[\s\/()]/g, '+') +
      '+' +
      artists.join('+').replace(/[\s\/()]/g, '+');
    this.hypem = `http://hypem.com/search/${str}/1/?sortby=favorite`;
    this.youtube = `https://www.youtube.com/results?search_query=${str}`;
    if (this.spotify) {
      this.spotifyLink = `https://open.spotify.com/track/${this.spotify.spotifyId}`;
      this.songwhipLink = `https://songwhip.com/convert?url=${encodeURIComponent(this.spotifyLink)}`;
    }
  }
}
