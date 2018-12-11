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

}