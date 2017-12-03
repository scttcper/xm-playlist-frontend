import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TrendModule } from 'ngx-trend';

import { Api } from './api';
import { AppComponent } from './app.component';
import { ArtistComponent } from './artist/artist.component';
import { CoverartComponent } from './coverart/coverart.component';
import { HomeComponent } from './home/home.component';
import { LinksComponent } from './links/links.component';
import { NavComponent } from './nav/nav.component';
import { NewestComponent } from './newest/newest.component';
import { PopularComponent } from './popular/popular.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { StationComponent } from './station/station.component';
import { StreamComponent } from './stream/stream.component';
import { TrackComponent } from './track/track.component';
import { XmUtility } from './util';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'station/:channelName',
    component: StationComponent,
    children: [
      { path: '', component: StreamComponent },
      { path: 'latest', component: NewestComponent },
      { path: 'popular', component: PopularComponent },
      { path: 'track/:trackId', component: TrackComponent },
      { path: 'artist/:id', component: ArtistComponent },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    StreamComponent,
    HomeComponent,
    NavComponent,
    CoverartComponent,
    LinksComponent,
    TrackComponent,
    ArtistComponent,
    StationComponent,
    NewestComponent,
    PopularComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),

    InfiniteScrollModule,
    TrendModule,
    NgbCollapseModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),

    XmUtility,
  ],
  providers: [Api],
  bootstrap: [AppComponent]
})
export class AppModule { }
