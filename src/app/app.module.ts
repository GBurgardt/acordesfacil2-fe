import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistsComponent } from './artists/artists.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ArtistsListComponent } from './artists-list/artists-list.component';
import { SongsListComponent } from './songs-list/songs-list.component';
import { VersionsComponent } from './versions/versions.component';
import { SongsComponent } from './songs/songs.component';
import { BadgeComponent } from './badge/badge.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtistsComponent,
    ArtistsListComponent,
    SongsListComponent,
    VersionsComponent,
    SongsComponent,
    BadgeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
