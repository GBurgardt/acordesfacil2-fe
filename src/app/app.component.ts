import { Component } from '@angular/core';
import { GoogleOauthService } from 'src/services/google-oauth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
        private googleOauthService: GoogleOauthService
    ) {}

    ngOnInit = () => {
        // this.googleOauthService.initializeFirebase();
        // this.googleOauthService.testFire();
    }
}
