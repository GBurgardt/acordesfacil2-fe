import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import searchStates from 'src/constants/searchStates';
import { UtilsService } from 'src/services/utilsService';

@Component({
    selector: 'app-artists-list',
    templateUrl: './artists-list.component.html',
    styleUrls: ['./artists-list.component.scss']
})
export class ArtistsListComponent {
    artists = [];
    searchText: String;

    // Empieza el input vacío
    searchState = searchStates.INPUT_CLEAN;

    constructor(
        private authService: AuthService,
        private router: Router,
        private utilsService: UtilsService
    ) { }


    onSearch = (newSearchText) => {
        // Activo spinner buscando..
        this.searchState = searchStates.SEARCHING;

        // Hago la consulta con un poco de debounce
        this.authService.debounce(
            () => {
                if (newSearchText && newSearchText.length > 0) {
                    this.authService.findArtist(newSearchText)
                        .subscribe(
                            (art: any) => {
                                this.artists = art;
                                // Saco spinner
                                this.searchState = searchStates.NOT_SEARCHING;
                            }
                        );
                } else {
                    this.artists = []
                    // Seteo estado input vacío
                    this.searchState = searchStates.INPUT_CLEAN;
                }
            },
            environment.TIME_DEBOUNCE
        )()
    }

    onClickArtist = (artist) => {
        this.router.navigate([`/${artist[`href`]}`])
    }

    clearSearch = () => {
        this.searchText = '';
        this.artists = [];
        this.searchState = searchStates.INPUT_CLEAN;
    }
}

