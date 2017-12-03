import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Api } from '../api';
import { Track } from '../app.interfaces';


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
