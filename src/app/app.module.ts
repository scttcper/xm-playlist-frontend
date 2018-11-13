import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { ChartjsModule } from '@ctrl/ngx-chartjs';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Angulartics2Module } from 'angulartics2';
import { AdsenseModule } from 'ng2-adsense';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

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
    pathMatch: 'full',
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
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),

    ChartjsModule,
    InfiniteScrollModule,
    NgbCollapseModule,
    Angulartics2Module.forRoot(),
    AdsenseModule.forRoot({
      adClient: 'ca-pub-7640562161899788',
      adSlot: 7259870550,
    }),

    XmUtility,
  ],
  providers: [Api],
  bootstrap: [AppComponent],
})
export class AppModule {}
