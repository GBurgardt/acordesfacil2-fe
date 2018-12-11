import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { timeout } from 'q';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private httpClient: HttpClient
    ) { }

    findArtist = (searchText) => 
        this.httpClient
            .get(
                `${environment.WS_URL}/artists?search=${searchText}`,
                {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    })
                }
            )

    findSongs = (href) => 
        this.httpClient
            .get(
                `${environment.WS_URL}/artists/${href}`,
                {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    })
                }
            )

    findPartituraById = (hrefSong, idPartitura) => 
        this.httpClient
            .get(
                `${environment.WS_URL}/versiones${hrefSong}/${idPartitura}`,
                {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    })
                }
            )

    findPartituras = (hrefSong) => 
        this.httpClient
            .get(
                `${environment.WS_URL}/versiones${hrefSong}`,
                {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    })
                }
            )

    findInfoSong = (hrefSong) => 
        this.httpClient
            .get(
                `${environment.WS_URL}/info${hrefSong}`,
                {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    })
                }
            )
            



    ////////////////////////////////////////////////////////////////////////////////
    /////////////////////////           U T I L S       ////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    timeout;
    
    debounce = (func, wait, immediate?) => 
        ( ...args ) => {
            const context = this;

            const callNow = immediate && !this.timeout;

            clearTimeout(this.timeout);   

            this.timeout = setTimeout(function() {
                this.timeout = null;
    
                 if (!immediate) {
                   func.apply(context, args);
                 }
            }, wait);
    
            if (callNow) func.apply(context, args);  
         }; 
    
}
