import { Component } from '@angular/core';
import { GoogleOauthService } from 'src/services/google-oauth.service';
import { LocalStorageService } from 'src/services/local-storage.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
        private googleOauthService: GoogleOauthService,
        private localStorageService: LocalStorageService
    ) {}

    ngOnInit = () => {
        this.localStorageService.setObject('favorites', []);
        // this.googleOauthService.initializeFirebase();
        // this.googleOauthService.testFire();
    }
}
