var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { LocalStorageService } from 'src/services/local-storage.service';
import { Router } from '@angular/router';
import { AcordesService } from '../services/acordes.service';
import { GoogleOauthService } from 'src/services/google-oauth.service';
import { FirebaseService } from 'src/services/firebase.service';
import { UtilsService } from 'src/services/utilsService';
var ArtistsComponent = /** @class */ (function () {
    function ArtistsComponent(localStorageService, router, acordesService, googleOauthService, firebaseService, utilsService) {
        var _this = this;
        this.localStorageService = localStorageService;
        this.router = router;
        this.acordesService = acordesService;
        this.googleOauthService = googleOauthService;
        this.firebaseService = firebaseService;
        this.utilsService = utilsService;
        // Bandera favoritos abierto/cerrado
        this.isFavOpen = false;
        // Favoritos
        this.favorites = [];
        this.openFavorite = function (fav, ver) {
            _this.router.navigate(["/" + fav.hrefArtist + "/" + fav.hrefSong], { queryParams: {
                    mode: 'offline',
                    idPartitura: ver.idPartitura
                } });
        };
    }
    ArtistsComponent.prototype.ngOnInit = function () {
        var _this = this;
        /**
         * Logueo por google y guardo data del user y favoritos
         */
        this.googleOauthService.login(function (resp) {
            var isBrowser = _this.utilsService.isBrowser();
            // Guardo la data del user logueado en el storage
            _this.localStorageService.setObject('currentGoogleUser', {
                email: !isBrowser ?
                    resp.email : resp.additionalUserInfo.profile.email
                // userName: resp.
            });
            // Obtengo favoritos inicialmente. Del localStorage
            _this.favorites = _this.localStorageService.getFavorites();
            // Si es CERO el localStorage, pruebo buscar por las dudas en firebase. Capas se reinstaló la app.
            if (!_this.favorites || _this.favorites.length <= 0) {
                _this.firebaseService.getSongs(resp.email).then(function (favsFirebase) { return _this.favorites = favsFirebase; });
            }
        }, function (err) {
            // Obtengo favoritos inicialmente
            _this.favorites = _this.localStorageService.getFavorites();
            console.log(err);
        });
        // Me suscribo al observable para notar cambios en favoritos y actualizar
        this.localStorageService.listenFavorites().subscribe(function (favs) { return _this.favorites = favs; });
    };
    ArtistsComponent = __decorate([
        Component({
            selector: 'app-artists',
            templateUrl: './artists.component.html',
            styleUrls: ['./artists.component.scss']
        }),
        __metadata("design:paramtypes", [LocalStorageService,
            Router,
            AcordesService,
            GoogleOauthService,
            FirebaseService,
            UtilsService])
    ], ArtistsComponent);
    return ArtistsComponent;
}());
export { ArtistsComponent };
//# sourceMappingURL=artists.component.js.map