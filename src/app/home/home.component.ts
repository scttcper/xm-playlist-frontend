import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { Api } from '../api';
import { Channel } from '../app.interfaces';

@Component({
  selector: 'xm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allChannels: Channel[] = [];
  channels: Channel[] = [];
  genres: string[] = [];
  curGenre: string;

  constructor(
    private api: Api,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
  ) { }

  ngOnInit() {
    this.title.setTitle('xmplaylist - XM and Sirius radio recently played');
    this.api.getChannels().subscribe((res) => {
      this.allChannels = res;
      this.channels = res;
      this.genres = _.uniq(res.map(n => n.genre));
      this.applyFilter();
    });
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
      this.router.navigate([])
      return;
    }
    this.curGenre = genre;
    this.router.navigate([], { queryParams: { genre }})
  }


}
