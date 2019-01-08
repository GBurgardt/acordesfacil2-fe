import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

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
     * Agrega o remueve una song a favoritos
     */
    toggleFavorite = (song) => {
        const favv = this.getObject('favorites') || [];

        favv.push(song);

        this.setObject(
            'favorites', 
            favv
        )
    }
}
