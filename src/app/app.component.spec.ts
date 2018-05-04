/* tslint:disable:no-unused-variable */
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TrendModule } from 'ngx-trend';

import { Api } from './api';
import { AppComponent } from './app.component';
import { ArtistComponent } from './artist/artist.component';
import { CoverartComponent } from './coverart/coverart.component';
import { HomeComponent } from './home/home.component';
import { LinksComponent } from './links/links.component';
import { NavComponent } from './nav/nav.component';
import { StreamComponent } from './stream/stream.component';
import { TrackComponent } from './track/track.component';
import { XmUtility } from './util';

import { routes } from './app.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
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
        HttpClientModule,
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
  }));

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
