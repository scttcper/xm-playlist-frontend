/* tslint:disable:no-unused-variable */
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { TrendModule } from 'ngx-trend';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { StreamComponent } from './stream/stream.component';
import { HomeComponent } from './home/home.component';
import { Api } from './api';
import { NavComponent } from './nav/nav.component';
import { XmUtility } from './util';
import { CoverartComponent } from './coverart/coverart.component';
import { LinksComponent } from './links/links.component';
import { TrackComponent } from './track/track.component';
import { ArtistComponent } from './artist/artist.component';

import { routes } from './app.module';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        StreamComponent,
        HomeComponent,
        NavComponent,
        CoverartComponent,
        LinksComponent,
        TrackComponent,
        ArtistComponent,
      ],
      imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(routes),

        InfiniteScrollModule,
        TrendModule,

        XmUtility,
      ],
      providers: [
        Api,
        { provide: APP_BASE_HREF, useValue: '/' },
      ],
    }).compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render [xmplaylist] in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('[xmplaylist]');
  }));
});
