import {
  of as observableOf,
  throwError as observableThrowError,
  Observable,
} from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, publishReplay, refCount } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { Play, Track } from './app.interfaces';

@Injectable()
export class Api {
  private url: string = environment.api;
  private trackCache: any = {};

  constructor(private http: HttpClient) {}

  getChannel(channelName: string, last?: Play): Observable<Play[]> {
    let params = new HttpParams();
    if (last) {
      params = params.set('last', String(new Date(last.startTime).getTime()));
    }
    return this.http
      .get<Play[]>(`${this.url}/channel/${channelName}`, { params: params })
      .pipe(
        catchError(this.handleError),
        map(res =>
          res.map(n => {
            this.trackCache[n.trackId] = n.track;
            return n;
          }),
        ),
      );
  }

  /* returns cache of track without activity or gets with activity */
  getTrack(trackId: number): Observable<Track> {
    if (!this.trackCache[trackId]) {
      return this.http
        .get<any>(`${this.url}/track/${trackId}`)
        .pipe(
          catchError(() => {
            return observableOf(null);
          }),
          map(res => {
            this.trackCache[trackId] = res;
            return res;
          }),
          publishReplay(),
          refCount(),
        );
    }
    return observableOf(this.trackCache[trackId]);
  }
  /* gets only missing activity */
  getActivity(trackId: number) {
    return this.http
      .get<any>(`${this.url}/trackActivity/${trackId}`)
      .pipe(catchError(this.handleError));
  }
  getArtist(channelName: string, id: number) {
    const params = new HttpParams().set('channel', channelName);
    return this.http
      .get<any>(`${this.url}/artist/${id}`, { params })
      .pipe(catchError(this.handleError));
  }
  getNewest(channelName: string): Observable<Track[]> {
    return this.http.get<Track[]>(`${this.url}/newest/${channelName}`).pipe(
      catchError(this.handleError),
      map(res =>
        res.map(n => {
          this.trackCache[n.id] = n;
          return n;
        }),
      ),
    );
  }
  getPopular(channelName: string): Observable<Track[]> {
    return this.http.get<Track[]>(`${this.url}/popular/${channelName}`).pipe(
      catchError(this.handleError),
      map(
        res =>
          res.map(n => {
            this.trackCache[n.id] = n;
            return n;
          }),
      ),
    );
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error.text() || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return observableThrowError(errMsg);
  }
}
