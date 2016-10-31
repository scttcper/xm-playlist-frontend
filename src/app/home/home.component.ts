import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '../api';
import { Channel } from '../app.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  channels: Observable<Channel[]>;

  constructor(private api: Api) { }

  ngOnInit() {
    this.channels = this.api.getChannels();
  }

}
