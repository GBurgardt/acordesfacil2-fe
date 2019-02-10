var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatListModule, MatSelectModule } from '@angular/material';
import { SpinnerItemComponent } from './spinner-item/spinner-item.component';
import { UtilsService } from 'src/services/utilsService';
import { LocalStorageService } from 'src/services/local-storage.service';
import { GoogleOauthService } from 'src/services/google-oauth.service';
import { FirebaseService } from 'src/services/firebase.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
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
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map