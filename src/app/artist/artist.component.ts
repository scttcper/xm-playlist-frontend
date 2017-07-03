import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { Api } from '../api';
import { Channel, Play } from '../app.interfaces';


@Component({
  selector: 'xm-artist',
  templateUrl: './artist.component.html',
})
export class ArtistComponent implements OnInit {
  tracks: any[];
  artist: any;

  constructor(
    private api: Api,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.api.getArtist(+params['id'])
        .subscribe((res) => {
          this.tracks = res.tracks;
          this.artist = res.artist;
        });
    });
  }

}
