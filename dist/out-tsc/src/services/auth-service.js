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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// declare var cordova: any;
var AuthService = /** @class */ (function () {
    function AuthService(httpClient) {
        var _this = this;
        this.httpClient = httpClient;
        this.findArtist = function (searchText) {
            return _this.httpClient
                .get(environment.WS_URL + "/artists?search=" + searchText, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                })
            });
        };
        this.findSongs = function (href) {
            return _this.httpClient
                .get(environment.WS_URL + "/artists/" + href, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                })
            });
        };
        this.findPartituraById = function (hrefSong, idPartitura) {
            return _this.httpClient
                .get(environment.WS_URL + "/versiones" + hrefSong + "/" + idPartitura, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                })
            });
        };
        this.findPartituras = function (hrefSong) {
            return _this.httpClient
                .get(environment.WS_URL + "/versiones" + hrefSong, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                })
            });
        };
        this.findInfoSong = function (hrefSong) {
            return _this.httpClient
                .get(environment.WS_URL + "/info" + hrefSong, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                })
            });
        };
        this.debounce = function (func, wait, immediate) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var context = _this;
                var callNow = immediate && !_this.timeout;
                clearTimeout(_this.timeout);
                _this.timeout = setTimeout(function () {
                    this.timeout = null;
                    if (!immediate) {
                        func.apply(context, args);
                    }
                }, wait);
                if (callNow)
                    func.apply(context, args);
            };
        };
    }
    AuthService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth-service.js.map