import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Track } from '../app.interfaces';
import { Api } from '../api';


@Component({
  selector: 'xm-newest',
  templateUrl: './newest.component.html',
  styles: [`
    table {
      background-color: #fff;
    }
  `],
})
export class NewestComponent implements OnInit {
  tracks: Track[];

  constructor(
    private api: Api,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe((params) => {
      this.api.getNewest(params['channelName'])
        .subscribe((tracks) => this.tracks = tracks);
    });
  }

}
