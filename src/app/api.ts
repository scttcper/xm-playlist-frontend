import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { environment } from '../environments/environment';
import { Channel, Play, Spotify, Track } from './app.interfaces';

@Injectable()
export class Api {

  currentChannel: BehaviorSubject<string> = new BehaviorSubject('');
  private url: string = environment.api;
  private spotifyCache: any = {};
  private channelCache: Observable<Channel[]>;
  private trackCache: any = {};

  constructor(private http: Http) { }

  getChannels(): Observable<Channel[]> {
    if (!this.channelCache)  {
      this.channelCache = this.http
        .get(`${this.url}/channels`)
        .map(res => res.json())
        .publishReplay()
        .refCount();
    }
    return this.channelCache;
  }

  getRecent(channelName: string, last?: Play): Observable<Play[]> {
    const search = new URLSearchParams();
    if (last) {
      search.set('last', String(new Date(last.startTime).getTime()));
    }
    return this.http
      .get(`${this.url}/recent/${channelName}`, { search })
      .map(res => {
        const r = res.json();
        r.map(n => {
          this.trackCache[n.trackId] = Observable.of(n.track);
          if (n.track.spotify) {
            this.spotifyCache[n.trackId] = Observable.of(n.track.spotify);
          }
        });
        return r;
      })
      .catch(this.handleError);
  }

  /* returns cache of track without activity or gets with activity */
  getTrack(trackId: number): Observable<Track> {
    if (!this.trackCache[trackId]) {
      this.trackCache[trackId] = this.http
        .get(`${this.url}/track/${trackId}`)
        .map(res => res.json())
        .catch(() => {
          return Observable.of(null);
        })
        .publishReplay()
        .refCount();
    }
    return this.trackCache[trackId];
  }

  /* gets only missing activity */
  getActivity(trackId: number) {
    return this.http
      .get(`${this.url}/trackActivity/${trackId}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  mostHeard(channelName: string): Observable<any[]> {
    return this.http
      .get(`${this.url}/mostHeard/${channelName}`)
      .map(res => res.json())
      .catch(this.handleError);
  }
  getArtist(id: number) {
    return this.http
      .get(`${this.url}/artist/${id}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getSpotify(trackId: number): Observable<Spotify> {
    if (!this.spotifyCache[trackId]) {
      this.spotifyCache[trackId] = this.http
        .get(`${this.url}/spotify/${trackId}`)
        .map(res => res.json())
        .catch(() => {
          return Observable.of(null);
        })
        .publishReplay()
        .refCount();
    }
    return this.spotifyCache[trackId];
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error.text() || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
