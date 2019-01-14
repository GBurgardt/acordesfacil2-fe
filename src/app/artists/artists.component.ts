import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/services/local-storage.service';
import { Router } from '@angular/router';

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
        private router: Router
    ) { }

    ngOnInit() {
        // Obtengo inicialmente los favoritos
        this.favorites = this.localStorageService.getFavorites();
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
