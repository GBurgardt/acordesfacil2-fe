var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import instruments from 'src/constants/instruments';
import tones from 'src/constants/tones';
import { UtilsService } from 'src/services/utilsService';
var AcordesService = /** @class */ (function () {
    function AcordesService(utilsService) {
        var _this = this;
        this.utilsService = utilsService;
        this.getLetraInstru = function (sheetType) { return instruments[sheetType] &&
            instruments[sheetType].letraInstru; };
        this.getInstruDescrip = function (sheetType) { return instruments[sheetType] &&
            instruments[sheetType].instrumento; };
        this.magicFunction = function (x) { return (Math.cos(x) + 1) * 300; };
        this.getToneByPosicion = function (posiTone) {
            var keyToneFinded = Object.keys(tones).find(function (keyTone) { return tones[keyTone].posicion === posiTone; });
            return keyToneFinded ? tones[keyToneFinded] : null;
        };
        this.changeTonePartitura = function (bodyPartitura, upOrDown) {
            var newBody = bodyPartitura;
            // Reemplazar en el body <a>A</a> por <a>A#<a/>, y así...
            Object.keys(tones).forEach(function (keyTone) {
                var tone = tones[keyTone];
                // Acordes mayores
                newBody = newBody.replace(new RegExp("<a>" + tone.descrip + "</a>", 'g'), "***<a>***" + tone[upOrDown] + "***</a>***");
                // Acordes menores
                newBody = newBody.replace(new RegExp("<a>" + tone.descrip + "m</a>", 'g'), "***<a>***" + tone[upOrDown] + "m***</a>***");
                // Acordes menores7
                newBody = newBody.replace(new RegExp("<a>" + tone.descrip + "m7</a>", 'g'), "***<a>***" + tone[upOrDown] + "m7***</a>***");
                // Acordes sus4
                newBody = newBody.replace(new RegExp("<a>" + tone.descrip + "sus4</a>", 'g'), "***<a>***" + tone[upOrDown] + "sus4***</a>***");
                // Acordes maj7
                newBody = newBody.replace(new RegExp("<a>" + tone.descrip + "maj7</a>", 'g'), "***<a>***" + tone[upOrDown] + "maj7***</a>***");
                // Acordes 7
                newBody = newBody.replace(new RegExp("<a>" + tone.descrip + "7</a>", 'g'), "***<a>***" + tone[upOrDown] + "7***</a>***");
                // Acordes dim
                newBody = newBody.replace(new RegExp("<a>" + tone.descrip + "dim</a>", 'g'), "***<a>***" + tone[upOrDown] + "dim***</a>***");
            });
            newBody = _this.utilsService.replaceAll("***<a>***", "<a>", newBody);
            newBody = _this.utilsService.replaceAll("***</a>***", "</a>", newBody);
            return newBody;
        };
        this.guessTone = function (bodySong) {
            var chords = bodySong
                .split('<a>')
                .filter(function (aspiringChord) { return !(!aspiringChord ||
                aspiringChord[0] === '<'); })
                .map(function (dirtyChord) { return dirtyChord
                .substring(0, dirtyChord.indexOf('<')); });
            var onlyOneLetterChords = chords
                .filter(function (c) { return c.length === 1; })
                .filter(function (value, index, self) { return self.indexOf(value) === index; });
            // 3 acordes mayores caso:
            //          a. Caso mas facil: 3 acordes de una letra (si o si son mayores)
            if (onlyOneLetterChords.length >= 3) {
                //a.1. Hay exactamente 3 acordes, caso mas simple
                // if (onlyOneLetterChords.length === 3) {
                var leftDistance = _this.isMajorTonality(onlyOneLetterChords[0], onlyOneLetterChords[1]);
                var mediumDistance = _this.isMajorTonality(onlyOneLetterChords[0], onlyOneLetterChords[2]);
                var rightDistance = _this.isMajorTonality(onlyOneLetterChords[1], onlyOneLetterChords[2]);
                debugger;
                // El facking tono
                var toneOfSong = leftDistance === 1 ? onlyOneLetterChords[2] :
                    mediumDistance === 1 ? onlyOneLetterChords[1] :
                        rightDistance === 1 ? onlyOneLetterChords[0] :
                            null;
                debugger;
                // }
            }
            debugger;
        };
        // Detecta si es una tonalidad mayor
        this.isMajorTonality = function (l1, l2) {
            return Object.keys(tones).some(function (tone) {
                // subo 2 mediotonos
                var tonosAdelante1 = tones[tones[tone].up].up;
                return (l1 === tone && l2 === tonosAdelante1) || (l2 === tone && l1 === tonosAdelante1);
            }) ? 1 : 2;
        };
    }
    AcordesService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [UtilsService])
    ], AcordesService);
    return AcordesService;
}());
export { AcordesService };
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
//# sourceMappingURL=acordes.service.js.map