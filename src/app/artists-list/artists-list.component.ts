import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth-service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
    selector: 'app-artists-list',
    templateUrl: './artists-list.component.html',
    styleUrls: ['./artists-list.component.scss']
})
export class ArtistsListComponent {
    artists = [];
    searchText: String;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }


    onSearch = (newSearchText) =>
        this.authService.debounce(
            () => newSearchText && newSearchText.length > 0 ?
                this.authService.findArtist(newSearchText).subscribe((art: any) => this.artists = art) :
                this.artists = [],
            environment.TIME_DEBOUNCE
        )()

    onClickArtist = (artist) => {
        this.router.navigate([`/${artist[`_id`]}`])
    }

}
