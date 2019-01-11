import { Component } from '@angular/core';

import { OAuthService, JwksValidationHandler, AuthConfig } from 'angular-oauth2-oidc';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'fe';

    constructor(private oauthService: OAuthService) {

        const authConfig: AuthConfig = {
            issuer: 'https://accounts.google.com',
            redirectUri: window.location.origin + '/index.html',
            // clientId: environment.googleClientId,
            clientId: 'clientId',
            scope: 'openid profile email',
            strictDiscoveryDocumentValidation: false
        };

        this.oauthService.configure(authConfig);
        this.oauthService.tokenValidationHandler = new JwksValidationHandler();
        this.oauthService.loadDiscoveryDocumentAndTryLogin();
    }

}
