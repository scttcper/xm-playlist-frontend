import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';

import { Api } from '../api';
import { Spotify, Track } from '../app.interfaces';

@Component({
  selector: 'xm-track',
  templateUrl: './track.component.html',
})
export class TrackComponent implements OnInit {
  track: Track;
  playsByDay: number[];
  spotify: Spotify;
  spotifyLink = '';
  youtubeLink = '';

  constructor(
    private api: Api,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.spotify = undefined;
      this.spotifyLink = '';
      this.youtubeLink = '';
      this.api
        .getTrack(+params['trackId'])
        .subscribe((track) => {
          this.track = track;
          this.title.setTitle(`${track.name}`);
          if (track.playsByDay) {
            this.setupActivity(track.playsByDay);
          } else {
            this.api.getActivity(track.id)
              .subscribe(n => this.setupActivity(n));
          }
          const artists = this.track.artists.map(n => n.name);
          const str = this.track.name.replace(/[\s\/()]/g, '+') + '+' + artists.join('+').replace(/[\s\/()]/g, '+');
          this.youtubeLink = `https://www.youtube.com/results?search_query=${str}`;
          if (track.spotify) {
            this.spotify = track.spotify;
            this.spotifyLink = `https://open.spotify.com/track/${track.spotify.spotifyId}`;
          }
        });
    });
  }
  setupActivity(playsByDay) {
    this.playsByDay = playsByDay.map((n) => +n.count);
  }

}
