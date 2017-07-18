import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';
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
  channel: Channel;

  constructor(
    private api: Api,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe((params) => {
      this.api.getChannels()
        .subscribe((res) => {
          this.channel = _.find(res, _.matchesProperty('id', params['channelName']));
        });
    });
    this.route.params.subscribe(() => this.refresh());
  }
  refresh() {
    this.api.getArtist(
      this.route.parent.snapshot.params['channelName'],
      this.route.snapshot.params['id'],
    ).subscribe((res) => {
      this.tracks = res.tracks;
      this.artist = res.artist;
      if (this.channel) {
        this.title.setTitle(`${res.artist.name} on ${this.channel.name} - xmplaylist.com`);
      }
    });
  }

}
