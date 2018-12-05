import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-age',
  templateUrl: './check-age.component.html',
  styleUrls: ['./check-age.component.scss']
})
export class CheckAgeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      localStorage.setItem('favourite', '');
  }

}
