import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { UtilsService } from 'src/services/utilsService';
import { LocalStorageService } from 'src/services/local-storage.service';

@Component({
    selector: 'app-versions',
    templateUrl: './versions.component.html',
    styleUrls: ['./versions.component.scss']
})
export class VersionsComponent implements OnInit {
    @ViewChild("sheetContainer") versionBody: ElementRef;

    // nameCurrentArtist;
    // currentSong;
    selectedVersion;

    slidingIntervalID = null;
    slidingVelocity = 1.5;


    versions = [];

    currentSongInfo;

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,        
        private router: Router,
        private utilsService: UtilsService,
        private localStorageService: LocalStorageService
    ) { }


    ngOnInit() {

        

        this.route.parent.params
            .subscribe(dataParent => {
                this.route.params
                    .subscribe(data => {

                        // Me fijo en los queryParams para ver si es modo offline o online
                        this.route.queryParams.subscribe(params => {
                            
                            // Si es offline, busco la version dada en las query en el localstorage. Sino, procedo normal en el else.
                            if (params && params.mode === 'offline') {
                                this.selectedVersion = this.localStorageService.getVersionOfFav(dataParent.hrefArtist, data.hrefSong, params.idPartitura);

                                this.currentSongInfo = this.localStorageService.getInfoSongOffline(dataParent.hrefArtist, data.hrefSong)
                            } else {

                                // Busca toda la info de las partituras para el select
                                this.authService
                                    .findPartituras(`/${dataParent.hrefArtist}/${data.hrefSong}`)
                                    .subscribe((versions: any) => {
                                        this.versions = versions;
                                    })
                                
                                // Busco la 1er parttura y la  seteo. Paralelamente busco las demas para que pueda cambiar
                                this.authService
                                    .findPartituraById(`/${dataParent.hrefArtist}/${data.hrefSong}`, 1)
                                    .subscribe(ver => {
                                        this.selectedVersion = ver;
                                    })
        
                                // Busca info de la cancion actual (nombre, artista)
                                this.authService
                                    .findInfoSong(`/${dataParent.hrefArtist}/${data.hrefSong}`)
                                    .subscribe(infoSong => {
                                        this.currentSongInfo = infoSong;
                                    })
                            }

                        })

                    });
            })
    }


    /**
     * Inicializa el intervalo de sliding, o lo para.
     */
    onClickPlay = () => {

        // Si apretó click y está en pausa, quiere decir que acaba de apretar PLAY
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.scrollear();
        } else {
            this.isPlaying = false;
        }

    }

    isPlaying = false;

    scrollear = () => 
        this.isPlaying ?
            setTimeout(
                () => {
                    console.log('Scrolling..')
                    console.log(this.magicFunction(this.slidingVelocity))

                    this.versionBody.nativeElement.scrollBy(0, 1);
                    this.scrollear()
                }, 
                this.magicFunction(this.slidingVelocity)
            )
            :
            null // Fin del scroll


    /**
     * 
     */
    magicFunction = (x) => (Math.cos(x) + 1) * 300

    onChangeVersion = (ver) => {
        // Activo spinner (TODO: Poner un spinner mas lindo reemplazando solo la partitura, no todo)
        this.selectedVersion = null;

        // Busco la partitura buscada
        this.authService
            .findPartituraById(`/${this.currentSongInfo.hrefArtist}/${this.currentSongInfo.hrefSong}`, ver.idPartitura)
            .subscribe(ver => {

                this.selectedVersion = ver;

                // Desactivo spinner

            })
    }

    onClickAddFavorito = () => {
        this.localStorageService.toggleFavorite(this.selectedVersion, this.currentSongInfo);
    }

}