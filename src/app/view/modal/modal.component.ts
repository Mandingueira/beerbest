import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { BeerService } from '../../service/beer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    beer$;
    abv;
    ibu;
    ebc;
    similar: Array<any> = [];
    state = localStorage.getItem('state');

    constructor(private dialog: MatDialog, private router: Router,
                @Inject(MAT_DIALOG_DATA) public data: any, private beer: BeerService) {
                this.getBeerDetails(data);
    }

    ngOnInit() {
    }

    getBeerDetails(data) {
       this.beer.getSingleBeer(data.id).subscribe((params) => {
            this.beer$ = params[0];
            const abv = Math.round(this.beer$.abv);
            const ibu = Math.round(this.beer$.abv);
            const ebc = Math.round(this.beer$.abv);

            this.beer.getSimilar('abv', abv, 'gt').subscribe(
                (res: Array<any>) => {
                    if (res) {
                        const min = Math.min.apply(Math, res.map(function(o) { return o.abv; }));
                        const result_min = res.filter(obj => {
                            return obj.abv === min;
                        });
                        if (result_min[0].id != data.id) {
                            this.similar.push(result_min[0]);
                        }
                        else {
                            this.beer.getSimilar('abv', abv, 'lt').subscribe((res2: Array<any>) => {
                                const max2 = Math.max.apply(Math, res2.map(function(o) { return o.abv; }));
                                const result_max2 = res2.filter(obj => {
                                    return obj.abv === max2;
                                });
                                this.similar.push(result_max2[0]);
                            });
                        }
                    }
                },
                (error) => {},
                () => {
                    this.beer.getSimilar('ibu', ibu, 'gt').subscribe((res3: Array<any>) => {
                        if (res3) {
                            const min3 = Math.min.apply(Math, res3.map(function(o) { return o.ibu; }));
                            const result_min3 = res3.filter(obj => {
                                return obj.ibu === min3;
                            });
                            if (result_min3[0].id != data.id && result_min3[0].id != this.similar[0]['id'] ) {
                               this.similar.push(result_min3[0]);
                            }
                            else {
                                this.beer.getSimilar('ibu', ibu, 'lt').subscribe((res4: Array<any>) => {
                                    const max4 = Math.max.apply(Math, res4.map(function(o) { return o.ibu; }));
                                    const result_max4 = res4.filter(obj => {
                                        return obj.ibu === max4;
                                    });
                                    this.similar.push(result_max4[0]);
                                });
                            }
                        }
                    },
                (error) => {},
                () => {
                    this.beer.getSimilar('ebc', ebc, 'gt').subscribe((res5: Array<any>) => {
                        if (res5) {
                            const min5 = Math.min.apply(Math, res5.map(function(o) { return o.ebc; }));
                            const result_min5 = res5.filter(obj => {
                                return obj.ebc === min5;
                            });
                            if (result_min5[0].id != data.id && result_min5[0].id != this.similar[0]['id'] && result_min5[0].id != this.similar[1]['id'] ) {
                                this.similar.push(result_min5[0]);
                            }
                            else {
                                this.beer.getSimilar('ebc', ebc, 'lt').subscribe(
                                    (res6: Array<any>) => {
                                        const max6 = Math.max.apply(Math, res6.map(function(o) { return o.ebc; }));
                                        const result_max6 = res6.filter(obj => {
                                            return obj.ebc === max6;
                                        });
                                        if (result_max6[0].id != data.id && result_max6[0].id != this.similar[0].id && result_max6[0].id != this.similar[1].id ) {
                                            this.similar.push(result_max6[0]);
                                        }
                                        else {
                                            for (let i = 0; i < res6.length; i++) {
                                                if(res6[i].id != data.id && res6[i].id != this.similar[0].id && res6[i].id != this.similar[1].id) {
                                                    this.similar.push(res6[i]);
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                );
                            }
                        }
                    });
                });
            });
        });
    }

    closeDialog(): void {
        this.dialog.closeAll();
        if (this.state === 'modal') {
            this.router.navigateByUrl('/beers');
        }
        else if (this.state === 'favourite') {
            this.router.navigateByUrl('/favourite');
        }
        else {
        }
    }
    addActivity() {
        localStorage.setItem('state', 'modal');
    }
}
