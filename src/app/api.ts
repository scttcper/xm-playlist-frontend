import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Channel } from './channel';
import { environment } from '../environments/environment';

@Injectable()
export class Api {

  constructor(private http: Http) { }

  getChannels(): Promise<Channel[]> {
    return this.http.get(`${environment.api}/channels`)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

}
