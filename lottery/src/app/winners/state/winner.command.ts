import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Range } from 'src/app/models/range.model';
import { getRanges } from 'src/app/ranges/state/ranges.selector';
import { AppState } from 'src/app/store/app.state';
import { map } from 'rxjs/operators';

import { RangesCommand } from 'src/app/ranges/state/ranges.command';
import { createWinner, loadWinners } from './winner.action';
import { Winner } from 'src/app/models/winner.model';

@Injectable({
    providedIn: 'root'
})
export class WinnersCommand {

    private ranges$: Observable<Range[]>;

    constructor(private store: Store<AppState>, private rc: RangesCommand) {
        this.ranges$ = this.store.select(getRanges);
    }

    loadOptions() {
        this.rc.loadInitialData();

        this.ranges$.pipe(
            map((ranges) => {
                let winners: Winner[] = [];
                ranges.forEach(range => {
                    for (let i = Number(range.initialValue); i <= range.finalValue; i++) {
                        winners.push({ option: i, winner: false });
                    }
                });
                return winners;
            })).subscribe((winners) => {
                this.store.dispatch(loadWinners({ winners }));
            });
    }

    createWinner() {
        let winner: Winner = {
            option: Math.round(Math.random()*18),
            winner: true
        }
        this.store.dispatch(createWinner({ winner }));
    }

}
