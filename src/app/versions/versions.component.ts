import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { UtilsService } from 'src/services/utilsService';

@Component({
    selector: 'app-versions',
    templateUrl: './versions.component.html',
    styleUrls: ['./versions.component.scss']
})
export class VersionsComponent implements OnInit {
    @ViewChild("sheetContainer") versionBody: ElementRef;

    nameCurrentArtist;
    currentSong;
    selectedVersion;

    slidingIntervalID = null;
    slidingVelocity = 1.5;

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,        
        private router: Router,
        private utilsService: UtilsService
    ) { }


    ngOnInit() {
        this.route.parent.params
            .subscribe(dataParent => {
                this.route.params
                    .subscribe(data => {
                        this.authService
                            .findPartitura(`/${dataParent.hrefArtist}/${data.hrefSong}`, 1)
                            .subscribe(a => {
                                debugger;
                            })

                        // this.authService.findSongs(dataParent.hrefArtist)
                        //     .subscribe((resp: any) => {
                        //         this.nameCurrentArtist = resp.name
                        //         this.currentSong = resp.songs.find(
                        //             song => song.name
                        //                 .toLowerCase()
                        //                 .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                        //                 .trim() === data.nameSong
                        //                                 .toLowerCase()
                        //                                 .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                        //                                 .trim()
                        //         );

                        //         // TODO: Guardar en storage version seleccionada
                        //         this.selectedVersion = this.currentSong.versions[0]
                        //     });
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
            
    test = () => Math.round(this.slidingVelocity * 100) / 100
}



// setTimeout(() => {
//     this.versionBody.nativeElement.scrollBy(0, 1);
//     this.onClickPlay()
// }, 350)


// this.versionBody.nativeElement.scrollTo(
//     0,
//     this.slidingVelocity * count
// )


// if (this.slidingIntervalID) {
//     clearInterval(this.slidingIntervalID)
//     this.slidingIntervalID = null;
// } else {

//     this.slidingIntervalID = setInterval(
//         () => { 

//             // const getCurrentOffsetTop = (element: ElementRef) => {
//             //     const rect = element.nativeElement.getBoundingClientRect();
//             //     return rect.top + window.pageYOffset - document.documentElement.clientTop;
//             // }

//             // console.log(getCurrentOffsetTop(this.versionBody));


//             this.versionBody.nativeElement.scrollBy({
//                 top: this.slidingVelocity,
//                 left: 0,
//                 behavior: 'smooth'
//             });
//         }, 
//         150
//     )
// }




        

        // if (this.slidingIntervalID) {
        //     clearInterval(this.slidingIntervalID)
        //     this.slidingIntervalID = null;
        // } else {

        //     this.slidingIntervalID = setInterval(
        //         () => { 
        //             setTimeout(() => {
        //                 this.versionBody.nativeElement.scrollBy({
        //                     top: this.slidingVelocity,
        //                     left: 0,
        //                     behavior: 'smooth'
        //                 });
        //             }, 2000)
        //         }, 
        //         50
        //     )
        // }