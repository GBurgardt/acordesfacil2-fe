import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-artists',
    templateUrl: './artists.component.html',
    styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent {
    // artists = [];
    // searchText: String;
    
    constructor(
        private authService: AuthService
    ) { }

    // onSearch = (newSearchText) => 
    //     this.authService.debounce(
    //         () => newSearchText && newSearchText.length > 0 ?
    //             this.authService.findArtist(newSearchText).subscribe((art: any) => this.artists = art) :
    //             this.artists = [],
    //         environment.TIME_DEBOUNCE
    //     )()

    // onClickArtist = (artist) => {
    //     console.log(artist);
    // }
        

}
