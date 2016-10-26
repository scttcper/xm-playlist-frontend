import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { StreamComponent } from './stream/stream.component';
import { HomeComponent } from './home/home.component';
import { Api } from './api';
import { NavComponent } from './nav/nav.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '2', component: StreamComponent },
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
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    Api,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
