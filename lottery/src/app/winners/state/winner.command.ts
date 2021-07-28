import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Range } from 'src/app/models/range.model';
import { getRanges } from 'src/app/ranges/state/ranges.selector';
import { AppState } from 'src/app/store/app.state';
import { map, take } from 'rxjs/operators';

import { RangesCommand } from 'src/app/ranges/state/ranges.command';
import { createWinner, loadWinners } from './winner.action';
import { Winner } from 'src/app/models/winner.model';
import { getWinners } from './winner.selector';

@Injectable({
    providedIn: 'root'
})
export class WinnersCommand {

    constructor(private store: Store<AppState>, private rc: RangesCommand) {
    }

    loadOptions() {
        this.rc.loadInitialData();

        let winnersString = localStorage.getItem('winners');
        let winnersObject = JSON.parse(winnersString);
        let winners: Winner[] = winnersObject ? winnersObject : [];
        
        this.store.dispatch(loadWinners({ winners }));
    }

    createWinner() {
        let winnersString = localStorage.getItem('winners');
        let winnersObject = JSON.parse(winnersString);
        let winnerss: Winner[] = winnersObject ? winnersObject : [];

        let winners$: Observable<Winner[]> = this.store.select(getWinners);

        winners$.pipe(take(1)).subscribe((data) => {
            let minval = data[0].option;
            let maxval = data[data.length - 1].option;
            let randomWinner = Math.round(Math.random() * (Number(maxval) - Number(minval)) + Number(minval));

            let filtereddata = data.filter((item) => item.winner == false);
            if (filtereddata.length == 0) {
                alert('All the tickets have been already selected');
            }
            else {
                while (true) {
                    let newwinner = data.filter((item) => item.option == randomWinner);
                    if (!newwinner[0].winner) {
                        let winner: Winner = {
                            option: randomWinner,
                            winner: true
                        }
                        this.saveWinner(winner);
                        this.store.dispatch(createWinner({ winner }));
                        break;
                    }
                    randomWinner = Math.round(Math.random() * (Number(maxval) - Number(minval)) + Number(minval));
                }
            }
        }).unsubscribe();
    }

    saveWinner(winner) {
        let winnersString = localStorage.getItem('winners');
        let winnersObject = JSON.parse(winnersString);
        let winners: Winner[] = winnersObject ? winnersObject : [];

        for (let i = 0; i < winners.length; i++) {
            if (winners[i].option == winner.option) {
                winners[i].winner = true;
            }
        }

        localStorage.setItem('winners', JSON.stringify(winners));
    }

}

