import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth-service';

@Component({
    selector: 'app-versions',
    templateUrl: './versions.component.html',
    styleUrls: ['./versions.component.scss']
})
export class VersionsComponent implements OnInit {
    nameCurrentArtist;
    currentSong;

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,        
        private router: Router
    ) { }


    ngOnInit() {

        this.route.parent.params
            .subscribe(dataParent => {

                this.route.params
                    .subscribe(data => {
                        
                        this.authService.findSongs(dataParent.idArtist)
                            .subscribe((resp: any) => {
                                this.nameCurrentArtist = resp.name
                                
                                this.currentSong = resp.songs.find(
                                    song => song.name
                                        .toLowerCase()
                                        .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                                        .trim() === data.nameSong
                                                        .toLowerCase()
                                                        .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                                                        .trim()
                                );
                                console.log(this.currentSong)
                            });
                    });

            })

    }

}
