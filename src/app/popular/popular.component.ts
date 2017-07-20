import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Track } from '../app.interfaces';
import { Api } from '../api';


@Component({
  selector: 'xm-popular',
  templateUrl: './popular.component.html',
  styles: [`
    table {
      background-color: #fff;
    }
  `],
})
export class PopularComponent implements OnInit {
  tracks: Track[];

  constructor(
    private api: Api,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe((params) => {
      this.api.getPopular(params['channelName'])
        .subscribe((tracks) => this.tracks = tracks);
    });
  }

}
