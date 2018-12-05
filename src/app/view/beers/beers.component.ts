import { Component, OnDestroy, OnInit } from '@angular/core';
import { BeerService } from '../../service/beer.service';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-beers',
    templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.scss'],
  animations: [
    trigger('list', [
      transition('* <=> *', [
        query(':enter', [
              style({opacity: 0, transform: 'translateY(-15px)' }),
              stagger('50ms',
                  animate('550ms ease-out',
                      style({ opacity: 1, transform: 'translateY(0px)'})))
        ],{optional: true}),
        query(':leave', animate('50ms', style({ opacity: 0 })),{
          optional: true })
      ])
    ])
  ]
})
export class BeersComponent implements OnInit, OnDestroy {

    beers$ = [];
    page: number = 1;
    finished: boolean = false;
    state = localStorage.getItem('state');
    selected: boolean = false;

    currentDialog: MatDialogRef<ModalComponent> = null;
    destroy = new Subject<any>();

    constructor(private beer: BeerService,
                public dialog: MatDialog,
                private router: Router,
                private route: ActivatedRoute) {

        route.params.pipe(takeUntil(this.destroy))
            .subscribe(params => {
                if (this.currentDialog) {
                    this.currentDialog.close();
                }
                if (params.id !== undefined) {
                    this.currentDialog = dialog.open(ModalComponent, {
                        width: '90vw',
                        height: '80vh',
                        data: {id: params.id}
                        }
                    );
                     this.currentDialog.afterClosed().subscribe(result => {
                         if (this.state === 'modal') {
                             router.navigateByUrl('/beers');
                         }
                         else if (this.state === 'favourite') {
                             router.navigateByUrl('/favourite');
                         }
                         else {
                         }
                    });
                }
            });
    }
    ngOnInit() {
        this.getBeers();
        localStorage.setItem('state', 'beers');
    }
    ngOnDestroy() {
        this.destroy.next();
    }
    getBeers() {
        this.beer.getBeers(this.page).subscribe((res) => {
            this.onSuccess(res);
        });
    }
    onSuccess(res) {
        for (let i = 0; i < res.length; i++) {
            this.beers$.push(res[i]);
            this.beers$[i]['selected'] = false;
            const fav = localStorage.getItem('favourite').split('|');
            for (let k = 0; k < fav.length; k++) {
                if (fav[k] == res[i]['id']) {
                    this.beers$[i]['selected'] = true;
                }
            }
        }
    }

    onScroll() {
        this.page = this.page + 1;
        if (this.page < 5) {
            this.getBeers();
        }
        else {
            this.finished = true;
        }
    }
}
