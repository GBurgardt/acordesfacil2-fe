import { Injectable } from '@angular/core';
import instruments from 'src/constants/instruments';
import tones from 'src/constants/tones';
import { UtilsService } from 'src/services/utilsService';

@Injectable({
    providedIn: 'root'
})
export class AcordesService {

    constructor(private utilsService: UtilsService) { }

    getLetraInstru = (sheetType) => instruments[sheetType] &&
        instruments[sheetType].letraInstru;
        
    getInstruDescrip = (sheetType) => instruments[sheetType] &&
        instruments[sheetType].instrumento;

    magicFunction = (x) => (Math.cos(x) + 1) * 300

    getToneByPosicion = (posiTone) => {
        const keyToneFinded = Object.keys(tones).find(keyTone => tones[keyTone].posicion === posiTone);

        return keyToneFinded ? tones[keyToneFinded] : null
    }


    changeTonePartitura = (bodyPartitura, upOrDown) => {

        let newBody = bodyPartitura;

        // Reemplazar en el body <a>A</a> por <a>A#<a/>, y así...
        
        Object.keys(tones).forEach(keyTone => {
            
            const tone = tones[keyTone];

            // Acordes mayores
            newBody = newBody.replace(
                new RegExp(`<a>${tone.descrip}</a>`, 'g'),
                `***<a>***${tone[upOrDown]}***</a>***`
            )

            // Acordes menores
            newBody = newBody.replace(
                new RegExp(`<a>${tone.descrip}m</a>`, 'g'),
                `***<a>***${tone[upOrDown]}m***</a>***`
            )

            // Acordes menores7
            newBody = newBody.replace(
                new RegExp(`<a>${tone.descrip}m7</a>`, 'g'),
                `***<a>***${tone[upOrDown]}m7***</a>***`
            )

            // Acordes sus4
            newBody = newBody.replace(
                new RegExp(`<a>${tone.descrip}sus4</a>`, 'g'),
                `***<a>***${tone[upOrDown]}sus4***</a>***`
            )

            // Acordes maj7
            newBody = newBody.replace(
                new RegExp(`<a>${tone.descrip}maj7</a>`, 'g'),
                `***<a>***${tone[upOrDown]}maj7***</a>***`
            )

            // Acordes 7
            newBody = newBody.replace(
                new RegExp(`<a>${tone.descrip}7</a>`, 'g'),
                `***<a>***${tone[upOrDown]}7***</a>***`
            )

            // Acordes dim
            newBody = newBody.replace(
                new RegExp(`<a>${tone.descrip}dim</a>`, 'g'),
                `***<a>***${tone[upOrDown]}dim***</a>***`
            )

        });

        newBody = this.utilsService.replaceAll(`***<a>***`, `<a>`, newBody);
        newBody = this.utilsService.replaceAll(`***</a>***`, `</a>`, newBody);


        return newBody;
    }

    guessTone = (bodySong) => {

        const chords = bodySong
            .split('<a>')
            .filter(
                aspiringChord => !(
                    !aspiringChord ||
                    aspiringChord[0]=== '<'
                )
            )
            .map(
                dirtyChord => dirtyChord
                    .substring(
                        0,
                        dirtyChord.indexOf('<')
                    )
            )

        const onlyOneLetterChords = chords
            .filter(
                c => c.length === 1
            )
            .filter(
                (value, index, self) => self.indexOf(value) === index
            )

        // 3 acordes mayores caso:
        //          a. Caso mas facil: 3 acordes de una letra (si o si son mayores)
        if (onlyOneLetterChords.length >= 3) {
            //a.1. Hay exactamente 3 acordes, caso mas simple
            // if (onlyOneLetterChords.length === 3) {

                const leftDistance = this.isMajorTonality(onlyOneLetterChords[0], onlyOneLetterChords[1]);
                const mediumDistance = this.isMajorTonality(onlyOneLetterChords[0], onlyOneLetterChords[2]);
                const rightDistance = this.isMajorTonality(onlyOneLetterChords[1], onlyOneLetterChords[2]);

                debugger;

                // El facking tono
                const toneOfSong = 
                    leftDistance === 1 ? onlyOneLetterChords[2] :
                    mediumDistance === 1 ? onlyOneLetterChords[1] :
                    rightDistance === 1 ? onlyOneLetterChords[0] :
                    null;

                debugger;

            // }
        }

        debugger;

    }


    // Detecta si es una tonalidad mayor
    isMajorTonality = (l1, l2) => 
        Object.keys(tones).some(
            tone => {
                // subo 2 mediotonos
                const tonosAdelante1 = tones[
                    tones[
                        tone
                    ].up
                ].up;

                return (l1 === tone && l2 === tonosAdelante1) || (l2 === tone && l1 === tonosAdelante1)

            }
        ) ? 1 : 2

        // (l1 === 'F' && l2 === 'G') || (l1 === 'G' && l2 === 'F') ? 'C' ||
        // (l1 === 'Gb' && l2 === 'Ab') || (l1 === 'Ab' && l2 === 'Gb') ? 'Db' : '' : ''

        
}


        
        // Busco todos los <a> y voy reemplazando su contenido

        // const fafaf = bodyPartitura
        //     .split(`<a>`)
        //     .filter(
        //         el => !(
        //             !el || 
        //             el[0] === '<'
        //         )
        //     );
        // debugger;



        // Object.keys(tones).forEach(keyTone => {

        //     // Tono viejo
        //     const oldTone = tones[keyTone];

        //     const newPosicion = 
        //         oldTone.posicion + deltaTone === 8 ? 1 :
        //         oldTone.posicion + deltaTone === 0 ? 0.5 :
        //         oldTone.posicion + deltaTone === 2.5 && oldTone.posicion <= 2 ? 3 :
        //         oldTone.posicion + deltaTone === 2.5 && oldTone.posicion >= 3 ? 2 :
        //         oldTone.posicion + deltaTone === 5.5 && oldTone.posicion <= 5 ? 6 :
        //         oldTone.posicion + deltaTone === 5.5 && oldTone.posicion >= 6 ? 5 :
        //         oldTone.posicion + deltaTone

        //     // Tono con el que se reemplaza
        //     const newToneKey = Object.keys(tones).find(
        //         keyTone => tones[keyTone].posicion === newPosicion
        //     );

        //     const newTone = tones[newToneKey];

        //     debugger;

        //     newBody = bodyPartitura.replace(
        //         `<a>${oldTone.descrip}</a>`
        //     )

        // })