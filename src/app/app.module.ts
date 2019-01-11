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
import { BadgeItemComponent } from './badge-item/badge-item.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
    MatButtonModule, 
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule
} from '@angular/material';
import { SpinnerItemComponent } from './spinner-item/spinner-item.component';
import { UtilsService } from 'src/services/utilsService';
import { LocalStorageService } from 'src/services/local-storage.service';

import { OAuthModule } from 'angular-oauth2-oidc';


@NgModule({
    declarations: [
        AppComponent,
        ArtistsComponent,
        ArtistsListComponent,
        SongsListComponent,
        VersionsComponent,
        SongsComponent,
        BadgeItemComponent,
        SpinnerItemComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatSelectModule,
        OAuthModule.forRoot()
    ],
    providers: [
        UtilsService,
        LocalStorageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
