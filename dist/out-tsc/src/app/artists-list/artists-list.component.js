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
import { AuthService } from '../../services/auth-service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import searchStates from 'src/constants/searchStates';
import { UtilsService } from 'src/services/utilsService';
var ArtistsListComponent = /** @class */ (function () {
    function ArtistsListComponent(authService, router, utilsService) {
        var _this = this;
        this.authService = authService;
        this.router = router;
        this.utilsService = utilsService;
        this.artists = [];
        // Empieza el input vacío
        this.searchState = searchStates.INPUT_CLEAN;
        this.onSearch = function (newSearchText) {
            // Activo spinner buscando..
            _this.searchState = searchStates.SEARCHING;
            // Hago la consulta con un poco de debounce
            _this.authService.debounce(function () {
                if (newSearchText && newSearchText.length > 0) {
                    _this.authService.findArtist(newSearchText)
                        .subscribe(function (art) {
                        _this.artists = art;
                        // Saco spinner
                        _this.searchState = searchStates.NOT_SEARCHING;
                    });
                }
                else {
                    _this.artists = [];
                    // Seteo estado input vacío
                    _this.searchState = searchStates.INPUT_CLEAN;
                }
            }, environment.TIME_DEBOUNCE)();
        };
        this.onClickArtist = function (artist) {
            _this.router.navigate(["/" + artist["href"]]);
        };
        this.clearSearch = function () {
            _this.searchText = '';
            _this.artists = [];
            _this.searchState = searchStates.INPUT_CLEAN;
        };
    }
    ArtistsListComponent = __decorate([
        Component({
            selector: 'app-artists-list',
            templateUrl: './artists-list.component.html',
            styleUrls: ['./artists-list.component.scss']
        }),
        __metadata("design:paramtypes", [AuthService,
            Router,
            UtilsService])
    ], ArtistsListComponent);
    return ArtistsListComponent;
}());
export { ArtistsListComponent };
//# sourceMappingURL=artists-list.component.js.map