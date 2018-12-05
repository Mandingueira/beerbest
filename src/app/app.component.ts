import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'beerbest';

    constructor(private router: Router) {
    }

  isLoginPage(): boolean {
      const check = this.router.url.indexOf('/check-age');
      if (check) {
          return true;
      }
      return false;
  }
}
