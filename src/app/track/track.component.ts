import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Api } from '../api';
import { Track } from '../app.interfaces';

@Component({
  selector: 'xm-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit, OnDestroy {
  track: Track;
  playsByDay: number[] = [];
  private sub: Subscription;

  constructor(
    private api: Api,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.api
        .getTrack(+params['trackId'])
        .subscribe((track) => {
          this.track = track;
          if (track.playsByDay) {
            this.setupActivity(track.playsByDay);
          } else {
            this.api.getActivity(track.id)
              .subscribe(n => this.setupActivity(n));
          }
        });
    });
  }
  setupActivity(playsByDay) {
    this.playsByDay = playsByDay.map((n) => +n.count);
    this.playsByDay.unshift(0);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
