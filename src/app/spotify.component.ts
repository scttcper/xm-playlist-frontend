import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'spotify-iframe',
  template: `
    <iframe
      [src]="src"
      width="100%"
      height="80"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"
    ></iframe>
  `,
})
export class SpotifyComponent implements OnInit {
  @Input() track: string;
  src: SafeResourceUrl;
  constructor(private doms: DomSanitizer) {}

  ngOnInit(): void {
    this.src = this.doms.bypassSecurityTrustResourceUrl(`https://open.spotify.com/embed/track/${this.track}`);
  }
}
