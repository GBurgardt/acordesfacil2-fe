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
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { UtilsService } from './utilsService';
var GoogleOauthService = /** @class */ (function () {
    function GoogleOauthService(angularFireAuth, utilsService) {
        var _this = this;
        this.angularFireAuth = angularFireAuth;
        this.utilsService = utilsService;
        this.getWindow = function () { return window; };
        this.getGooglePlus = function () { return _this.getWindow().plugins.googleplus; };
        this.login = function (callbackSuccess, callbackError) {
            return _this.utilsService.isBrowser() ?
                _this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider).then(callbackSuccess, callbackError)
                :
                    _this.getGooglePlus().login({}, callbackSuccess, callbackError);
        };
        this.logout = function () {
            return _this.getGooglePlus().logout(function (msg) {
                console.log('logout');
            }, function (msg) {
                console.log(msg);
            });
        };
    }
    GoogleOauthService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AngularFireAuth,
            UtilsService])
    ], GoogleOauthService);
    return GoogleOauthService;
}());
export { GoogleOauthService };
//# sourceMappingURL=google-oauth.service.js.map