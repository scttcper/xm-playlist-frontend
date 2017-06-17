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
      search.set('last', String(last.id));
    }
    return this.http
      .get(`${this.url}/recent/${channelName}`, { search })
      .map(res => res.json())
      .catch(this.handleError);
  }

  getTrack(trackId: number): Observable<Track> {
    return this.http
      .get(`${this.url}/track/${trackId}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  mostHeard(channelName: string): Observable<any[]> {
    return this.http
      .get(`${this.url}/mostHeard/${channelName}`)
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
