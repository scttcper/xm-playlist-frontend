import { Component, Input, OnInit } from '@angular/core';

import { Spotify } from '../app.interfaces';

@Component({
  selector: 'xm-coverart',
  template: `
  <img *ngIf="spotify" class="img-fluid card-img-top" width="100%" [src]="spotify.cover">
  <svg *ngIf="!spotify" class="img-fluid card-img-top" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 95 95" x="0px" y="0px"><g fill="#dfdfdf" data-name="Layer 2"><rect x="31" y="33.5" width="4" height="29" rx="1" ry="1"/><rect x="37" y="54.5" width="4" height="8" rx="1" ry="1"/><rect x="43" y="37.5" width="4" height="25" rx="1" ry="1"/><rect x="49" y="44.5" width="4" height="18" rx="1" ry="1"/><rect x="55" y="33.5" width="4" height="29" rx="1" ry="1"/><rect x="61" y="37.5" width="4" height="25" rx="1" ry="1"/></g></svg>
  `,
})
export class CoverartComponent implements OnInit {
  @Input() spotify: Spotify;

  constructor() { }
  ngOnInit() {}
}
