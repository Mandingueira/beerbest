import { Component, OnInit } from '@angular/core';
import {BeerService} from '../../service/beer.service';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {

  beers$;
  favourite = localStorage.getItem('favourite').split('|').map(Number);

  constructor(private beer: BeerService,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getBeers();
    localStorage.setItem('state', 'favourite');
  }

  getBeers() {
      this.beer.getFavourite().subscribe((res) => {
        this.beers$ = res;
          for (let i = 0; i < this.beers$.length; i++) {
              this.beers$[i]['selected'] = true;
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
