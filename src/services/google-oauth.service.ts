import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { UtilsService } from './utilsService';

@Injectable()
export class GoogleOauthService {
    constructor(
        private angularFireAuth: AngularFireAuth,
        private utilsService: UtilsService
    ) { }

    private getWindow: any = () => window;

    private getGooglePlus = () => this.getWindow().plugins.googleplus;

    getStateGoogleAuth = (callback) => 
        this.angularFireAuth.auth.onAuthStateChanged(
            callback
        )
    

    login = (callbackSuccess, callbackError) => 
        this.utilsService.isBrowser() ?
            // this.angularFireAuth.auth.signInWithCustomToken()
            this.angularFireAuth.auth.signInWithPopup(
                new firebase.auth.GoogleAuthProvider
            ).then(
                callbackSuccess,
                callbackError
            )
            :
            this.getGooglePlus().login(
                {},
                callbackSuccess,
                callbackError
            )
    
    logout = () => 
        this.getGooglePlus().logout(
            msg => {
                console.log('logout');
            },
            msg => {
                console.log(msg);
            }
        );


}