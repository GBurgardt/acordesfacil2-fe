import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'badge-item',
    templateUrl: './badge-item.component.html',
    styleUrls: ['./badge-item.component.scss']
})
export class BadgeItemComponent implements OnInit {

    @Input() text;

    constructor() { }

    ngOnInit() {
    }

}
