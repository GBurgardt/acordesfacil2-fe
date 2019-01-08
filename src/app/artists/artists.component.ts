import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/services/local-storage.service';

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
        private localStorageService: LocalStorageService
    ) { }

    ngOnInit() {
        this.favorites = this.localStorageService.getFavorites();
    }

    fafa() {
        console.log('ofjaojfasjoasfjo')
    }
}
