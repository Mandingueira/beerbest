import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { CheckAgeComponent } from './view/check-age/check-age.component';
import { ForKidsComponent } from './view/for-kids/for-kids.component';
import { BeersComponent } from './view/beers/beers.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CardComponent } from './component/card/card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './view/modal/modal.component';
import { NgHttpLoaderModule} from 'ng-http-loader';
import { FavouriteComponent } from './view/favourite/favourite.component';
import { ErrorInterceptor } from './__helpers/error.interceptors';
import {AuthInterceptor} from './__helpers/auth.interceptor';
import { AboutComponent } from './view/about/about.component';
import { TemplateDrivenFormComponent } from './view/template-driven-form/template-driven-form.component';
import { HeaderComponent } from './component/header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ReactiveFormComponent } from './component/reactive-form/reactive-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckAgeComponent,
    ForKidsComponent,
    BeersComponent,
    CardComponent,
    ModalComponent,
    FavouriteComponent,
    AboutComponent,
    TemplateDrivenFormComponent,
    HeaderComponent,
    ReactiveFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    InfiniteScrollModule,
    RouterModule,
    NgHttpLoaderModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }

  ],
  bootstrap: [AppComponent],
  entryComponents: [
      ModalComponent
  ]
})
export class AppModule { }
