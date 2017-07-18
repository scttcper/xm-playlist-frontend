import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { environment } from '../environments/environment';
import { Channel, Play, Spotify, Track } from './app.interfaces';

@Injectable()
export class Api {
  private url: string = environment.api;
  private spotifyCache: any = {};
  private channelCache: Observable<Channel[]>;
  private trackCache: any = {};

  constructor(private http: HttpClient) { }

  getChannels(): Observable<Channel[]> {
    if (!this.channelCache)  {
      this.channelCache = this.http
        .get<Channel[]>(`${this.url}/channels`)
        .publishReplay()
        .refCount();
    }
    return this.channelCache;
  }

  getRecent(channelName: string, last?: Play): Observable<Play[]> {
    let params = new HttpParams();
    if (last) {
      params = params.set('last', String(new Date(last.startTime).getTime()));
    }
    return this.http
      .get<Play[]>(`${this.url}/recent/${channelName}`, { params: params })
      .map(res => res.map(n => {
        this.trackCache[n.trackId] = Observable.of(n.track);
        if (n.track.spotify) {
          this.spotifyCache[n.trackId] = Observable.of(n.track.spotify);
        }
        return n;
      }))
      .catch(this.handleError);
  }

  /* returns cache of track without activity or gets with activity */
  getTrack(trackId: number): Observable<Track> {
    if (!this.trackCache[trackId]) {
      this.trackCache[trackId] = this.http
        .get(`${this.url}/track/${trackId}`)
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
      .catch(this.handleError);
  }

  mostHeard(channelName: string): Observable<any[]> {
    return this.http
      .get(`${this.url}/mostHeard/${channelName}`)
      .catch(this.handleError);
  }
  getArtist(id: number) {
    return this.http
      .get(`${this.url}/artist/${id}`)
      .catch(this.handleError);
  }

  getSpotify(trackId: number): Observable<Spotify> {
    if (!this.spotifyCache[trackId]) {
      this.spotifyCache[trackId] = this.http
        .get(`${this.url}/spotify/${trackId}`)
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
