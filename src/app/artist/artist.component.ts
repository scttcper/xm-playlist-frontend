import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { matchesProperty } from 'lodash-es';

import { Api } from '../api';
import { channels, Channel } from '../channels';


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
      this.channel = channels.find(matchesProperty('id', params['channelName']));
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
