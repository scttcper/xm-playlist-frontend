import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import { uniq } from 'lodash';
import { Channel, channels } from 'xm-playlist/src/channels';

import { Api } from '../api';

@Component({
  selector: 'xm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allChannels = channels;
  channels = channels;
  genres: string[] = uniq(channels.map(n => n.genre)).sort();
  curGenre: string;

  constructor(
    private api: Api,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
  ) { }

  ngOnInit() {
    this.title.setTitle('xmplaylist - XM and Sirius radio recently played');
    this.applyFilter();
    this.route.queryParamMap.subscribe((q) => {
      this.curGenre = q.get('genre');
      this.applyFilter();
    });
  }
  applyFilter() {
    if (!this.allChannels.length) {
      return;
    }
    if (!this.curGenre) {
      this.channels = this.allChannels;
    } else {
      this.channels = this.allChannels
        .filter(n => n.genre === this.curGenre);
    }
  }
  setGenre(genre: string) {
    if (this.curGenre === genre) {
      this.curGenre = undefined;
      this.channels = this.allChannels;
      this.router.navigate([]);
      return;
    }
    this.curGenre = genre;
    this.router.navigate([], { queryParams: { genre }});
  }


}
