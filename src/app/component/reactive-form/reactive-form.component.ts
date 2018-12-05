import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {BeerService} from '../../service/beer.service';


@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit{

    message = new TemplateMessage();
    beers;
    favourite = localStorage.getItem('favourite').split('|').map(Number);

    favoriteSeason: string;
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];


    // email = new FormControl('', [Validators.required, Validators.email]);
    constructor(private beer: BeerService){    }

    // getErrorMessage() {
    //     return this.email.hasError('required') ? 'You must enter a value' :
    //         this.email.hasError('email') ? 'Not a valid email' :
    //             '';
    // }

    onSubmit() {
        console.log('dgfd');
        console.log(this.message)
    }

    ngOnInit() {
        this.getBeers();
        localStorage.setItem('state', 'favourite');
    }

    getBeers() {
        this.beer.getFavourite().subscribe((res) => {
                this.beers = res;
                for (let i = 0; i < this.beers.length; i++) {
                    this.beers[i]['selected'] = true;
                }
            },
            (err: HttpErrorResponse) => {
                console.log(err.status);
                if(err.status === 404){
                    alert("Serwer error. Try again")
                }
            });
    }

}

export class TemplateMessage {
    constructor (
        public subject?: string,
        public message?: string,
        public name?: string,
        public email?: string,
        public beer = 'Warka',
        public bot?:boolean) { }
}
