import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeersComponent } from './view/beers/beers.component';
import { ForKidsComponent } from './view/for-kids/for-kids.component';
import { CheckAgeComponent} from './view/check-age/check-age.component';
import {ModalComponent} from './view/modal/modal.component';
import {FavouriteComponent} from './view/favourite/favourite.component';
import {AboutComponent} from './view/about/about.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: '/check-age',
      pathMatch: 'full'
    },
    {
      path: 'check-age',
      component: CheckAgeComponent
,   },
    {
      path: 'beers',
      component: BeersComponent
,   },
    {
      path: 'beer-details/:id',
      component: BeersComponent
,   },
    {
      path: 'for-kids',
      component: ForKidsComponent
,   },
    {
      path: 'favourite',
      component: FavouriteComponent
,   },
    {
      path: 'about',
      component: AboutComponent
,   },
    {
        path: '**',
        redirectTo: '/beers',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
