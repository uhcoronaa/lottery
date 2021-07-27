import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Range } from 'src/app/models/range.model';
import { AppState } from 'src/app/store/app.state';
import { createRange, loadRanges } from './ranges.action';

@Injectable({
  providedIn: 'root'
})
export class RangesCommand {
  constructor(private store: Store<AppState>) { }

  loadInitialData(): void {

    let rangesString = localStorage.getItem('ranges');
    let rangesObject = JSON.parse(rangesString);
    let ranges: Range[] = rangesObject ? rangesObject : [];

    if (ranges) {
      this.store.dispatch(loadRanges({ ranges }));
    }

  }

  createRange(range): void {

    let rangesString = localStorage.getItem('ranges');
    let rangesObject = JSON.parse(rangesString);
    let ranges: Range[] = rangesObject ? rangesObject : [];

    ranges.push(range);
    localStorage.setItem('ranges', JSON.stringify(ranges));

    this.store.dispatch(createRange(range));
  }
}
