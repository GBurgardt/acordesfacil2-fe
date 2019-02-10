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
import { GoogleOauthService } from 'src/services/google-oauth.service';
import { FirebaseService } from 'src/services/firebase.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';


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
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule
    ],
    providers: [
        UtilsService,
        LocalStorageService,
        GoogleOauthService,
        FirebaseService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
