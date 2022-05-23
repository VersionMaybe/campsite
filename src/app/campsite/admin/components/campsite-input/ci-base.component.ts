import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    template: '',
    styleUrls: ['./campsite-input.scss']
})
export abstract class CiBaseComponent {

    @Input() readonly = false;
    @Input() disabled = false;
    @Input() abstract value: any;
    @Output() valueChange = new EventEmitter<this['value']>();

    @Input() look: 'normal' | 'transparent' = 'normal';
    @Input() label = '';

    constructor() { }

}
