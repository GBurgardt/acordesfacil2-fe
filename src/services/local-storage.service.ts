import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    private favoritosSubject = new Subject<any>();

    constructor(private firebaseService: FirebaseService) { }

    /**
     * Setear algo en el localStorage, puede ser un json
     */
    setObject = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    }


    /**
     * Obtener algo del localStorage
     */
    getObject = (key) => {
        var value = localStorage.getItem(key);
        return value && JSON.parse(value);
    }

    /**
     * Limpia el local storage
     */
    clearLocalStorage = () => {
        localStorage.clear();
    }

    /**
     * Retorna los favoritos
     */
    getFavorites = () => 
        this.getObject('favorites') || []
    

    /**
     * Agrega o remueve una version de una song a favoritos
     */
    toggleFavorite = (currentVersion, songInfo) => {        
        const favoritos = this.getObject('favorites') || [];

        // Busco si la canción ya está en favoritos
        const currentSong = favoritos.find(
            songFav => 
                songFav.hrefArtist === songInfo.hrefArtist && 
                songFav.hrefSong === songInfo.hrefSong
        )

        // Variable con los nuevos favoritos
        let newFavoritos;

        // Si ya esta en favoritos, busco si la version que se está agregando también está.
        if (currentSong) {
            // Si la veersion ya existe, la saco. Sino, la meto
            if (currentSong.versions.some(ver => ver.idPartitura === currentVersion.idPartitura)) {
                currentSong.versions = currentSong.versions.filter(ver => ver.idPartitura !== currentVersion.idPartitura);
            } else {
                currentSong.versions = currentSong.versions.concat(currentVersion)
            }

            // Ahora si quedaron versiones en la song, la reemplazo. Sino, la borro.            
            if (currentSong.versions.length > 0) {
                // Reemplazo en favoritos la song completa
                newFavoritos = favoritos
                    .filter(
                        songFav => !(songFav.hrefArtist === songInfo.hrefArtist && songFav.hrefSong === songInfo.hrefSong)
                    )
                    .concat(currentSong);
            } else {
                newFavoritos = favoritos
                    .filter(
                        songFav => !(songFav.hrefArtist === songInfo.hrefArtist && songFav.hrefSong === songInfo.hrefSong)
                    )
            }

        } else {
            // Si no está, creo la currentSong
            const songToAdd = {
                ...songInfo, 
                versions: [currentVersion]
            };

            // Ahora reemplazo en favoritos la song completa
            newFavoritos = favoritos
                .concat(songToAdd);

        }
            
        // Guardo favortios actualizado
        this.setObject(
            'favorites', 
            newFavoritos
        );

        // Tambien lo guardo en firebase (si y solo si está logueado con Google)
        const currentUserEmail = this.getObject('currentGoogleUser') ? 
            this.getObject('currentGoogleUser').email : null;

        if (currentUserEmail) {
            this.firebaseService.updateFavoritesByEmail(
                currentUserEmail,
                newFavoritos
            )
        }

        // Actualizo el subject de favoritos para los que escuchan (artistsPage) puedan actualizar
        this.favoritosSubject.next(newFavoritos);
    }


    /**
     * Retorna si una versión de una canción está o no en favoritos
     */
    getIfVersionIsInFav = (version, songInfo) => {        
        const favoritos = this.getObject('favorites') || [];

        // Busco si la canción ya está en favoritos
        const currentSong = favoritos.find(
            songFav => 
                songFav.hrefArtist === songInfo.hrefArtist && 
                songFav.hrefSong === songInfo.hrefSong
        );

        // Busco si la version existe en la song (si la song existe)
        return currentSong && 
            currentSong.versions.some(ver => ver.idPartitura === version.idPartitura)

    }

    /**
     * Retorna una version a partir de un favorito seleccionado (dados la info de la song y el idPartitura)
     */
    getVersionOfFav = (hrefArtist, hrefSong, idPartitura) => {        
        const favoritos = this.getObject('favorites') || [];

        const currentSong = favoritos.find(
            songFav => 
                songFav.hrefArtist === hrefArtist && 
                songFav.hrefSong === hrefSong
        );
            // debugger;
        return currentSong.versions.find(ver => ver.idPartitura.toString() === idPartitura.toString())
    }

    /**
     * Retorna info de la song offline favoritos
     */
    getInfoSongOffline = (hrefArtist, hrefSong) => {        
        const favoritos = this.getObject('favorites') || [];

        const currentSong = favoritos.find(
            songFav => 
                songFav.hrefArtist === hrefArtist && 
                songFav.hrefSong === hrefSong
        );

        return currentSong
    }


    /**
     * Retorna un observable que esuccha todo el tiempo actualizaciones de favoritos
     */
    listenFavorites = () => this.favoritosSubject.asObservable();
}
