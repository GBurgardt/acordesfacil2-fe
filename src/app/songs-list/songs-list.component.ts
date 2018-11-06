import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-songs-list',
    templateUrl: './songs-list.component.html',
    styleUrls: ['./songs-list.component.scss']
})
export class SongsListComponent implements OnInit {
    songs = [];
    songsComplete = [];
    idCurrentArtist;
    nameCurrentArtist;
    searchText: String;

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.params
            .subscribe(data => {
                this.idCurrentArtist = data.idArtist;
                this.authService.findSongs(data.idArtist)
                    .subscribe((resp: any) => {
                        this.songs = this.songsComplete = resp.songs;
                        this.nameCurrentArtist = resp.name;
                    });
            });
    }

    onClickSong = (song) => {
        console.log(song[`name`]);
        this.router.navigate([`/${this.idCurrentArtist}/${song[`name`]}`])
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
