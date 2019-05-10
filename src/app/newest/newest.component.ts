import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Api } from '../api';
import { Track } from '../app.interfaces';


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
      this.api.getNewest(params.channelName)
        .subscribe((tracks) => this.tracks = tracks);
    });
  }

}
