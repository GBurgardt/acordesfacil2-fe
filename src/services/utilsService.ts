import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

    constructor() { }

    getItemListStyle = (porcentaje, ind) => 
        (ind % 2) ?
            `linear-gradient(90deg, rgb(111, 169, 138) ${porcentaje}%, #3a3a3a 0%)`
            :
            `linear-gradient(90deg, rgb(98, 150, 122)  ${porcentaje}%, #303030 0%)`

            
    parseDecimal = (key) => Number(key).toFixed(2);
    



    // getItemListStyle = (items, ind, nameKey) => {

    //     const currentItem = items[ind];

    //     let currentPorcentaje;

    //     if (nameKey === 'popularity') {

    //         const bestPopularity = items[0].popularity;

    //         const currentPopularity = currentItem.popularity;

    //         // const diffRand = Math.random() > 0.5 ? 2 : -2;

    //         if (currentPopularity > 0) {
    //             // currentPorcentaje = ((100 * currentPopularity) / (bestPopularity)) + diffRand;
    //             currentPorcentaje = ((100 * currentPopularity) / (bestPopularity));
    //         } 

    //         // else {
    //         //     currentPorcentaje = currentSong.versions.length.... bla bla bla. Tengo que ordenar por versions.length a los que NO tienene popularidad, y concatenar
    //         // }

    //     } else {
    //         currentPorcentaje = currentItem[nameKey];
    //     }


    //     return (ind % 2) ?
    //         `linear-gradient(90deg, rgb(111, 169, 138) ${currentPorcentaje}%, #3a3a3a 0%)`
    //         :
    //         `linear-gradient(90deg, rgb(98, 150, 122)  ${currentPorcentaje}%, #303030 0%)`
    // }
        
    

}