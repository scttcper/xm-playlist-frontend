import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { Api } from '../api';
import { Channel } from '../app.interfaces';

@Component({
  selector: 'xm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allChannels: Channel[];
  channels: Channel[];
  genres: string[] = [];
  curGenre = '';

  constructor(private api: Api) { }

  ngOnInit() {
    this.api.getChannels().subscribe((res) => {
      this.allChannels = res;
      this.channels = res;
      this.genres = _.uniq(res.map(n => n.genre));
    });
  }

  setGenre(genre: string) {
    if (this.curGenre === genre) {
      this.curGenre = '';
      this.channels = this.allChannels;
      return;
    }
    this.curGenre = genre;
    this.channels = this.allChannels.filter(n => n.genre === genre);
  }


}
