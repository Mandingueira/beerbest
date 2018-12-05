import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() beer;
  @Input() beers$;
  favourite;
  state = localStorage.getItem('state');

  constructor() { }

  ngOnInit() {
  }

  addToFavourite(id) {
      this.favourite = localStorage.getItem('favourite').split('|').map(Number);
      event.stopPropagation();
      if (this.state === 'beers') {
          const index = id - 1;
          const arr = this.favourite.indexOf(id);
          if (arr !== -1) {
              this.favourite.splice(arr, 1);
              this.beers$[index]['selected'] = false;
          }
          else {
              this.favourite.push(id);
              this.beers$[index]['selected'] = true;
          }
      }
      else if (this.state === 'favourite') {
          const arr = this.favourite.indexOf(id);
          for (let i = 0; i < this.beers$.length; i++) {
              if (this.beers$[i].id == id){
                  const arr2 = this.beers$.indexOf(this.beers$[i]);
                  this.beers$.splice(arr2, 1);
              }
          }
          this.favourite.splice(arr, 1);
      }
      const fav = this.favourite.toString().split(',').join('|');
      localStorage.setItem('favourite', fav);
  }

}
