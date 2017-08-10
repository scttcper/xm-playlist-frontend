import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { Channel } from 'xm-playlist/src/channels';

import { environment } from '../environments/environment';
import { Play, Spotify, Track } from './app.interfaces';

@Injectable()
export class Api {
  private url: string = environment.api;
  private channelCache: Observable<Channel[]>;
  private trackCache: any = {};

  constructor(private http: HttpClient) { }

  getChannel(channelName: string, last?: Play): Observable<Play[]> {
    let params = new HttpParams();
    if (last) {
      params = params.set('last', String(new Date(last.startTime).getTime()));
    }
    return this.http
      .get<Play[]>(`${this.url}/channel/${channelName}`, { params: params })
      .map(res => res.map(n => {
        this.trackCache[n.trackId] = n.track;
        return n;
      }))
      .catch(this.handleError);
  }

  /* returns cache of track without activity or gets with activity */
  getTrack(trackId: number): Observable<Track> {
    if (!this.trackCache[trackId]) {
      return this.http
        .get(`${this.url}/track/${trackId}`)
        .map(res => {
          this.trackCache[trackId] = res;
          return res;
        })
        .catch(() => {
          return Observable.of(null);
        })
        .publishReplay()
        .refCount();
    }
    return Observable.of(this.trackCache[trackId]);
  }
  /* gets only missing activity */
  getActivity(trackId: number) {
    return this.http
      .get(`${this.url}/trackActivity/${trackId}`)
      .catch(this.handleError);
  }
  getArtist(channelName: string, id: number) {
    const params = new HttpParams().set('channel', channelName);
    return this.http
      .get(`${this.url}/artist/${id}`, { params })
      .catch(this.handleError);
  }
  getNewest(channelName: string): Observable<Track[]> {
    return this.http
      .get<Track[]>(`${this.url}/newest/${channelName}`)
      .map(res => res.map(n => {
        this.trackCache[n.id] = n;
        return n;
      }))
      .catch(this.handleError);
  }
  getPopular(channelName: string): Observable<Track[]> {
    return this.http
      .get<Track[]>(`${this.url}/popular/${channelName}`)
      .map(res => res.map(n => {
        this.trackCache[n.id] = n;
        return n;
      }))
      .catch(this.handleError);
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
