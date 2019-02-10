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
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { UtilsService } from 'src/services/utilsService';
import { LocalStorageService } from 'src/services/local-storage.service';
import { AcordesService } from '../services/acordes.service';
var VersionsComponent = /** @class */ (function () {
    function VersionsComponent(authService, route, utilsService, // Se usa en html
    localStorageService, acordesService) {
        var _this = this;
        this.authService = authService;
        this.route = route;
        this.utilsService = utilsService;
        this.localStorageService = localStorageService;
        this.acordesService = acordesService;
        this.slidingIntervalID = null;
        this.slidingVelocity = 1.5;
        this.versions = [];
        // Cantidad de tonos sumados o restados al original
        this.deltaTone = 0;
        /**
         * Inicializa el intervalo de sliding, o lo para.
         */
        this.onClickPlay = function () {
            // Si apretó click y está en pausa, quiere decir que acaba de apretar PLAY
            if (!_this.isPlaying) {
                _this.isPlaying = true;
                // this.acordesService.scrollear(this.isPlaying, this.versionBody, this.slidingVelocity);
                _this.scrollear();
            }
            else {
                _this.isPlaying = false;
            }
        };
        this.isPlaying = false;
        this.scrollear = function () {
            return _this.isPlaying ?
                setTimeout(function () {
                    _this.versionBody.nativeElement.scrollBy(0, 1);
                    _this.scrollear();
                }, _this.acordesService.magicFunction(_this.slidingVelocity))
                :
                    null;
        }; // Fin del scroll
        this.onChangeVersion = function (ver) {
            // Activo spinner (TODO: Poner un spinner mas lindo reemplazando solo la partitura, no todo)
            _this.selectedVersion = null;
            // Busco la partitura buscada
            _this.authService
                .findPartituraById("/" + _this.currentSongInfo.hrefArtist + "/" + _this.currentSongInfo.hrefSong, ver.idPartitura)
                .subscribe(function (verObtenida) {
                _this.selectedVersion = __assign({}, verObtenida, ver);
            });
        };
        this.onClickAddFavorito = function () {
            _this.localStorageService.toggleFavorite(_this.selectedVersion, _this.currentSongInfo);
        };
        this.actualizarTonos = function (upOrDown) {
            // this.deltaTone = this.deltaTone + cambio;
            _this.selectedVersion.body =
                _this.acordesService.changeTonePartitura(_this.selectedVersion.body, upOrDown);
        };
    }
    VersionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.acordesService.guessTone(_this.selectedVersion.body);
        }, 1800);
        this.route.parent.params
            .subscribe(function (dataParent) {
            _this.route.params
                .subscribe(function (data) {
                // Me fijo en los queryParams para ver si es modo offline o online
                _this.route.queryParams.subscribe(function (params) {
                    // Si es offline, busco la version dada en las query en el localstorage. Sino, procedo normal en el else.
                    if (params && params.mode === 'offline') {
                        _this.selectedVersion = _this.localStorageService.getVersionOfFav(dataParent.hrefArtist, data.hrefSong, params.idPartitura);
                        _this.currentSongInfo = _this.localStorageService.getInfoSongOffline(dataParent.hrefArtist, data.hrefSong);
                    }
                    else {
                        // Busca toda la info de las partituras para el select
                        _this.authService
                            .findPartituras("/" + dataParent.hrefArtist + "/" + data.hrefSong)
                            .subscribe(function (versions) {
                            _this.versions = versions;
                            // Busco la 1er partitura y la seteo. 
                            _this.authService
                                .findPartituraById("/" + dataParent.hrefArtist + "/" + data.hrefSong, 1)
                                .subscribe(function (ver) {
                                var infoParti = _this.versions.find(function (ver) { return ver.idPartitura === 1; });
                                _this.selectedVersion = __assign({}, ver, infoParti);
                            });
                        });
                        // Busca info de la cancion actual (nombre, artista)
                        _this.authService
                            .findInfoSong("/" + dataParent.hrefArtist + "/" + data.hrefSong)
                            .subscribe(function (infoSong) {
                            _this.currentSongInfo = infoSong;
                        });
                    }
                });
            });
        });
    };
    __decorate([
        ViewChild("sheetContainer"),
        __metadata("design:type", ElementRef)
    ], VersionsComponent.prototype, "versionBody", void 0);
    VersionsComponent = __decorate([
        Component({
            selector: 'app-versions',
            templateUrl: './versions.component.html',
            styleUrls: ['./versions.component.scss']
        }),
        __metadata("design:paramtypes", [AuthService,
            ActivatedRoute,
            UtilsService,
            LocalStorageService,
            AcordesService])
    ], VersionsComponent);
    return VersionsComponent;
}());
export { VersionsComponent };
//# sourceMappingURL=versions.component.js.map