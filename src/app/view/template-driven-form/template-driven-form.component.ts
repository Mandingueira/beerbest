import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.scss']
})
export class TemplateDrivenFormComponent {

    message = new TemplateMessage();

    email = new FormControl('', [Validators.required, Validators.email]);
    constructor(){    }

    getErrorMessage() {
        return this.email.hasError('required') ? 'You must enter a value' :
            this.email.hasError('email') ? 'Not a valid email' :
                '';
    }

    onSubmit() {
        console.log('dgfd');
        console.log(this.message)
    }

}

export class TemplateMessage {
    constructor (
        public subject?: string,
        public message?: string,
        public name?: string,
        public email?: string){}
}
