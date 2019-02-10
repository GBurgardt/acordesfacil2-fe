var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FirebaseService } from './firebase.service';
var LocalStorageService = /** @class */ (function () {
    function LocalStorageService(firebaseService) {
        var _this = this;
        this.firebaseService = firebaseService;
        this.favoritosSubject = new Subject();
        /**
         * Setear algo en el localStorage, puede ser un json
         */
        this.setObject = function (key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        };
        /**
         * Obtener algo del localStorage
         */
        this.getObject = function (key) {
            var value = localStorage.getItem(key);
            return value && JSON.parse(value);
        };
        /**
         * Limpia el local storage
         */
        this.clearLocalStorage = function () {
            localStorage.clear();
        };
        /**
         * Retorna los favoritos
         */
        this.getFavorites = function () {
            return _this.getObject('favorites') || [];
        };
        /**
         * Agrega o remueve una version de una song a favoritos
         */
        this.toggleFavorite = function (currentVersion, songInfo) {
            var favoritos = _this.getObject('favorites') || [];
            // Busco si la canción ya está en favoritos
            var currentSong = favoritos.find(function (songFav) {
                return songFav.hrefArtist === songInfo.hrefArtist &&
                    songFav.hrefSong === songInfo.hrefSong;
            });
            // Variable con los nuevos favoritos
            var newFavoritos;
            // Si ya esta en favoritos, busco si la version que se está agregando también está.
            if (currentSong) {
                // Si la veersion ya existe, la saco. Sino, la meto
                if (currentSong.versions.some(function (ver) { return ver.idPartitura === currentVersion.idPartitura; })) {
                    currentSong.versions = currentSong.versions.filter(function (ver) { return ver.idPartitura !== currentVersion.idPartitura; });
                }
                else {
                    currentSong.versions = currentSong.versions.concat(currentVersion);
                }
                // Ahora si quedaron versiones en la song, la reemplazo. Sino, la borro.            
                if (currentSong.versions.length > 0) {
                    // Reemplazo en favoritos la song completa
                    newFavoritos = favoritos
                        .filter(function (songFav) { return !(songFav.hrefArtist === songInfo.hrefArtist && songFav.hrefSong === songInfo.hrefSong); })
                        .concat(currentSong);
                }
                else {
                    newFavoritos = favoritos
                        .filter(function (songFav) { return !(songFav.hrefArtist === songInfo.hrefArtist && songFav.hrefSong === songInfo.hrefSong); });
                }
            }
            else {
                // Si no está, creo la currentSong
                var songToAdd = __assign({}, songInfo, { versions: [currentVersion] });
                // Ahora reemplazo en favoritos la song completa
                newFavoritos = favoritos
                    .concat(songToAdd);
            }
            // Guardo favortios actualizado
            _this.setObject('favorites', newFavoritos);
            // Tambien lo guardo en firebase (si y solo si está logueado con Google)
            var currentUserEmail = _this.getObject('currentGoogleUser') ?
                _this.getObject('currentGoogleUser').email : null;
            if (currentUserEmail) {
                _this.firebaseService.updateFavoritesByEmail(currentUserEmail, newFavoritos);
            }
            // Actualizo el subject de favoritos para los que escuchan (artistsPage) puedan actualizar
            _this.favoritosSubject.next(newFavoritos);
        };
        /**
         * Retorna si una versión de una canción está o no en favoritos
         */
        this.getIfVersionIsInFav = function (version, songInfo) {
            var favoritos = _this.getObject('favorites') || [];
            // Busco si la canción ya está en favoritos
            var currentSong = favoritos.find(function (songFav) {
                return songFav.hrefArtist === songInfo.hrefArtist &&
                    songFav.hrefSong === songInfo.hrefSong;
            });
            // Busco si la version existe en la song (si la song existe)
            return currentSong &&
                currentSong.versions.some(function (ver) { return ver.idPartitura === version.idPartitura; });
        };
        /**
         * Retorna una version a partir de un favorito seleccionado (dados la info de la song y el idPartitura)
         */
        this.getVersionOfFav = function (hrefArtist, hrefSong, idPartitura) {
            var favoritos = _this.getObject('favorites') || [];
            var currentSong = favoritos.find(function (songFav) {
                return songFav.hrefArtist === hrefArtist &&
                    songFav.hrefSong === hrefSong;
            });
            // debugger;
            return currentSong.versions.find(function (ver) { return ver.idPartitura.toString() === idPartitura.toString(); });
        };
        /**
         * Retorna info de la song offline favoritos
         */
        this.getInfoSongOffline = function (hrefArtist, hrefSong) {
            var favoritos = _this.getObject('favorites') || [];
            var currentSong = favoritos.find(function (songFav) {
                return songFav.hrefArtist === hrefArtist &&
                    songFav.hrefSong === hrefSong;
            });
            return currentSong;
        };
        /**
         * Retorna un observable que esuccha todo el tiempo actualizaciones de favoritos
         */
        this.listenFavorites = function () { return _this.favoritosSubject.asObservable(); };
    }
    LocalStorageService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [FirebaseService])
    ], LocalStorageService);
    return LocalStorageService;
}());
export { LocalStorageService };
//# sourceMappingURL=local-storage.service.js.map