import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

    constructor() { }

    private getWindow: any = () => window;

    getItemListStyle = (porcentaje, ind) => 
        (ind % 2) ?
            `linear-gradient(90deg, rgb(111, 169, 138) ${porcentaje}%, #3a3a3a 0%)`
            :
            `linear-gradient(90deg, rgb(98, 150, 122)  ${porcentaje}%, #303030 0%)`

            
    parseDecimal = (key) => Number(key).toFixed(2);

    replaceAll = (find, replace, str) => 
        str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
    

    isBrowser = () => {
        if( /^file:\/{3}[^\/]/i.test(this.getWindow().location.href) ){
            return false;
        }
        return true;
    }
}