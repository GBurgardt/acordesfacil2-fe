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
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'src/services/utilsService';
var SongsListComponent = /** @class */ (function () {
    function SongsListComponent(authService, route, router, utilsService) {
        var _this = this;
        this.authService = authService;
        this.route = route;
        this.router = router;
        this.utilsService = utilsService;
        this.onClickSong = function (song) {
            // debugger;
            // this.router.navigate([`/${this.hrefArtist}/${song[`name`]}`])
            _this.router.navigate(["" + song["href"]]);
        };
        this.onSearch = function (searchedText) {
            return searchedText && searchedText.length > 0 ?
                _this.songs = _this.songsComplete.filter(function (song) { return song.name
                    .toLowerCase()
                    .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                    .trim()
                    .includes(searchedText
                    .toLowerCase()
                    .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                    .trim()); })
                :
                    _this.songs = _this.songsComplete;
        };
    }
    SongsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (data) {
            _this.hrefArtist = data.hrefArtist;
            _this.authService.findSongs(data.hrefArtist)
                .subscribe(function (resp) {
                // this.songs = this.songsComplete = resp.songs.sort((a,b) => b.popularity - a.popularity); // Popularity no existe más luego de la pérdida de la db de mongo
                _this.songs = _this.songsComplete = resp.songs;
                _this.nameCurrentArtist = resp.artistName;
            });
        });
    };
    SongsListComponent = __decorate([
        Component({
            selector: 'app-songs-list',
            templateUrl: './songs-list.component.html',
            styleUrls: ['./songs-list.component.scss']
        }),
        __metadata("design:paramtypes", [AuthService,
            ActivatedRoute,
            Router,
            UtilsService])
    ], SongsListComponent);
    return SongsListComponent;
}());
export { SongsListComponent };
//# sourceMappingURL=songs-list.component.js.map