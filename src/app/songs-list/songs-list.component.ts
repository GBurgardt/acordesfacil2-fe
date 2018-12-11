import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'src/services/utilsService';

@Component({
    selector: 'app-songs-list',
    templateUrl: './songs-list.component.html',
    styleUrls: ['./songs-list.component.scss']
})
export class SongsListComponent implements OnInit {
    // songs = [];
    // songsComplete = [];
    songs;
    songsComplete;
    hrefArtist;
    nameCurrentArtist;
    searchText: String;

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private utilsService: UtilsService
    ) { }

    ngOnInit() {
        this.route.params
            .subscribe(data => {
                this.hrefArtist = data.hrefArtist;
                this.authService.findSongs(data.hrefArtist)
                    .subscribe((resp: any) => {
                        // this.songs = this.songsComplete = resp.songs.sort((a,b) => b.popularity - a.popularity); // Popularity no existe más luego de la pérdida de la db de mongo
                        this.songs = this.songsComplete = resp.songs;
                        this.nameCurrentArtist = resp.artistName;
                    });
            });
    }

    onClickSong = (song) => {
        // debugger;
        // this.router.navigate([`/${this.hrefArtist}/${song[`name`]}`])
        this.router.navigate([`${song[`href`]}`])
    }

    onSearch = (searchedText) => 
        searchedText && searchedText.length > 0 ?
            this.songs = this.songsComplete.filter(
                song => song.name
                            .toLowerCase()
                            .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                            .trim()
                            .includes(
                                searchedText
                                    .toLowerCase()
                                    .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                                    .trim()
                            )
            )
            :
            this.songs = this.songsComplete


}
