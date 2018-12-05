import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  link = 'https://api.punkapi.com/v2/beers/';

  constructor(private http: HttpClient) { }

  getBeers(page: number) {
      return this.http.get(this.link + '?_page=' + page + '&per_page=20');  }
  getSingleBeer(id) {
    return this.http.get(this.link + id);
  }
  getSimilar(type, val, a) {
      return this.http.get(this.link + '?' + type + '_' + a + '=' + val);
  }
  getFavourite() {
      const fav = localStorage.getItem('favourite');
      const parm = new HttpParams().set('ids', fav);
      // return this.http.get(this.link + '?ids=' + fav);
      return this.http.get(this.link, {params: parm});
  }
}
