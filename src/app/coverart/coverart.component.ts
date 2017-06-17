import { Component, Input, OnInit } from '@angular/core';

import { Api } from '../api';
import { Spotify } from '../app.interfaces';

@Component({
  selector: 'xm-coverart',
  template: `
  <a [routerLink]="['/track', trackId]">
    <img class="img-fluid" width="100%" [src]="image">
  </a>
  `,
})
export class CoverartComponent implements OnInit {
  @Input() trackId: number;
  image = '/assets/img/album_placeholder.jpg';

  constructor(private api: Api) { }
  ngOnInit() {
    this.api.getSpotify(this.trackId)
      .subscribe((spotify) => {
        if (!spotify) {
          return;
        }
        this.image = spotify.cover;
      });
  }

}
