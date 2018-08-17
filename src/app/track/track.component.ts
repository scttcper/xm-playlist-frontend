import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';

import { format } from 'date-fns';

import { Api } from '../api';
import { PlaysByDay, Spotify, Track } from '../app.interfaces';

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

  data: any = {};
  options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [{ display: false, gridLines: { display: false }, ticks: { beginAtZero: true } }],
      xAxes: [{ display: false, gridLines: { display: false }, ticks: { beginAtZero: true } }],
    },
    legend: {display: false}
  };

  constructor(
    private api: Api,
    private route: ActivatedRoute,
    private title: Title,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.setup(+params.trackId);
    });
  }
  setup(id: number) {
    this.spotify = undefined;
    this.spotifyLink = '';
    this.youtubeLink = '';
    this.api.getTrack(id).subscribe(track => {
      this.track = track;
      this.title.setTitle(`${track.name}`);
      if (track.playsByDay) {
        this.setupActivity(track.playsByDay);
      } else {
        this.api.getActivity(track.id).subscribe(n => this.setupActivity(n));
      }
      const artists = this.track.artists.map(n => n.name);
      const str =
        this.track.name.replace(/[\s\/()]/g, '+') +
        '+' +
        artists.join('+').replace(/[\s\/()]/g, '+');
      this.youtubeLink = `https://www.youtube.com/results?search_query=${str}`;
      if (track.spotify) {
        this.spotify = track.spotify;
        this.spotifyLink = `https://open.spotify.com/track/${
          track.spotify.spotifyId
        }`;
      }
    });
  }
  setupActivity(playsByDay: PlaysByDay[]) {
    const data = {
      labels: [],
      datasets: [
        {
          label: 'Plays',
          data: [],
          fill: false,
          backgroundColor: '#dfdfdf',
          borderWidth: 1,
        },
      ],
    };
    data.datasets[0].data = playsByDay.map(n => +n.count);
    data.datasets[0].data.shift();
    data.labels = playsByDay.map(n => format(new Date(n.day), 'MM/d'));
    this.data = data;
  }
}
