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
var UtilsService = /** @class */ (function () {
    function UtilsService() {
        var _this = this;
        this.getWindow = function () { return window; };
        this.getItemListStyle = function (porcentaje, ind) {
            return (ind % 2) ?
                "linear-gradient(90deg, rgb(111, 169, 138) " + porcentaje + "%, #3a3a3a 0%)"
                :
                    "linear-gradient(90deg, rgb(98, 150, 122)  " + porcentaje + "%, #303030 0%)";
        };
        this.parseDecimal = function (key) { return Number(key).toFixed(2); };
        this.replaceAll = function (find, replace, str) {
            return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
        };
        this.isBrowser = function () {
            if (/^file:\/{3}[^\/]/i.test(_this.getWindow().location.href)) {
                return false;
            }
            return true;
        };
    }
    UtilsService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], UtilsService);
    return UtilsService;
}());
export { UtilsService };
//# sourceMappingURL=utilsService.js.map