import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Range } from 'src/app/models/range.model';
import { Winner } from 'src/app/models/winner.model';
import { AppState } from 'src/app/store/app.state';
import { createRange, loadRanges } from './ranges.action';
import { getRanges } from './ranges.selector';

@Injectable({
  providedIn: 'root'
})
export class RangesCommand {
  constructor(private store: Store<AppState>) { }

  loadInitialData(): void {

    let rangesString = localStorage.getItem('ranges');
    let rangesObject = JSON.parse(rangesString);
    let ranges: Range[] = rangesObject ? rangesObject : [];

    ranges.sort((a: any, b: any) => {
      return a.initialValue - b.initialValue;
    });

    if (ranges) {
      this.store.dispatch(loadRanges({ ranges }));
    }

  }

  overlapRange(storedRange: Range, newRange: Range): Boolean {
    if (newRange.initialValue >= storedRange.initialValue && newRange.initialValue <= storedRange.finalValue) {
      return true;
    }
    else if (newRange.finalValue >= storedRange.initialValue && newRange.finalValue <= storedRange.finalValue) {
      return true;
    }
    else {
      return false;
    }
  }

  incorrectProportion(range): Boolean {
    if (range.initialValue > range.finalValue) {
      return true;
    } else {
      return false;
    }
  }

  createRange(range: Range): void {

    if (this.incorrectProportion(range)) {
      alert('Initial value higher than Final Value');
      return;
    }

    let rangesString = localStorage.getItem('ranges');
    let rangesObject = JSON.parse(rangesString);
    let ranges: Range[] = rangesObject ? rangesObject : [];

    let actualRanges$: Observable<Range[]> = this.store.select(getRanges);

    let overlapFlag = false;

    actualRanges$.subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        if (this.overlapRange(data[i], range)) {
          overlapFlag = true;
          break;
        }
      }
    });

    if (overlapFlag) {
      alert('Overlap Range')
    }
    else {
      ranges.push(range);
      localStorage.setItem('ranges', JSON.stringify(ranges));
      this.store.dispatch(createRange({ range }));

      let winnersString = localStorage.getItem('winners');
      let winnersObject = JSON.parse(winnersString);
      let winners: Winner[] = winnersObject ? winnersObject : [];

      for (let i = Number(range.initialValue); i <= range.finalValue; i++) {
        winners.push({ option: i, winner: false });
      }

      localStorage.setItem('winners', JSON.stringify(winners));

      alert('Range Created');
    }

  }
}
