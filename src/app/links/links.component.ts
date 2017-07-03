import { Component, OnInit, Input } from '@angular/core';

import { Api } from '../api';
import { Play } from '../app.interfaces';

@Component({
  selector: 'xm-links',
  template: `
  <div class="links m-2">
    <a [routerLink]="['/track', trackId]" *ngIf="!hideTrack" class="btn btn-secondary info" role="button">
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
    <a [href]="spotify" *ngIf="spotify" target="_blank" class="btn btn-secondary spotify" role="button">
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
  `]
})
export class LinksComponent implements OnInit {
  @Input() trackId: number;
  @Input() name: string;
  @Input() artists: any[];
  @Input() hideTrack: boolean;
  youtube = '';
  hypem = '';
  spotify = '';

  constructor(private api: Api) { }

  ngOnInit() {
    const artists = this.artists.map(n => n.name);
    const str = this.name.replace(/[\s\/()]/g, '+') + '+' + artists.join('+').replace(/[\s\/()]/g, '+');
    this.hypem = `http://hypem.com/search/${str}/1/?sortby=favorite`;
    this.youtube = `https://www.youtube.com/results?search_query=${str}`;
    this.api.getSpotify(this.trackId).subscribe((spotify) => {
      if (!spotify) {
        return;
      }
      this.spotify = `https://open.spotify.com/track/${spotify.spotifyId}`;
    });
  }

}
