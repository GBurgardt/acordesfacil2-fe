import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/services/local-storage.service';
import { Router } from '@angular/router';
import { AcordesService } from '../services/acordes.service';
import { GoogleOauthService } from 'src/services/google-oauth.service';
import { FirebaseService } from 'src/services/firebase.service';
import { UtilsService } from 'src/services/utilsService';

@Component({
    selector: 'app-artists',
    templateUrl: './artists.component.html',
    styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent {
    // Bandera favoritos abierto/cerrado
    isFavOpen = false

    // Favoritos
    favorites = [];
    
    constructor(
        private localStorageService: LocalStorageService,
        private router: Router,
        public acordesService: AcordesService,
        private googleOauthService: GoogleOauthService,
        private firebaseService: FirebaseService,
        private utilsService: UtilsService
    ) { }


    // La ultima palabra la tiene la data de firebase
    updateFavorites = (emailUser) => {
        this.firebaseService.getFavoritesByEmail(emailUser).then(
            favsFirebase => {
                // Guardo acá
                this.favorites = favsFirebase;
                // Guardo en localStorage
                this.localStorageService.setObject('favorites', favsFirebase);
            }
        )
    }

    /**
     * Se maneja todo el login por Google, y se updatean los favoritos
     */
    ngOnInit() {
        
        // Primero me fijo si ya hay un user logueado
        this.googleOauthService.getStateGoogleAuth(user => {

            // Si hay..
            if (user) {
                const emailUser = user.email;

                this.updateFavorites(emailUser);
            } else {
                // Si NO hay un user logueado, logueo
                this.googleOauthService.login(
                    resp => {
                        
                        const isBrowser = this.utilsService.isBrowser();
        
                        const emailUser = !isBrowser ? 
                            resp.email : resp.additionalUserInfo.profile.email;
        
                        // Guardo la data del user logueado en el storage
                        this.localStorageService.setObject('currentGoogleUser', {
                            email: emailUser
                        })
        
                        this.updateFavorites(emailUser);
                        
                    },
                    err => {
                        // Obtengo favoritos
                        this.favorites = this.localStorageService.getFavorites();
                        console.log(err)
                        alert(err);
                    }
                );
            }

        })

        // Me suscribo al observable para notar cambios en favoritos y actualizar
        this.localStorageService.listenFavorites().subscribe(favs => this.favorites = favs);
    }

    openFavorite = (fav, ver) => {
        this.router.navigate(
            [`/${fav.hrefArtist}/${fav.hrefSong}`],
            { queryParams: { 
                mode: 'offline',
                idPartitura: ver.idPartitura
            } }
        )
    }

}
