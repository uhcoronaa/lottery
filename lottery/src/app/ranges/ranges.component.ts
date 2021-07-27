import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Range } from '../models/range.model';
import { AppState } from '../store/app.state';
import { RangesCommand } from './state/ranges.command';
import { getRanges } from './state/ranges.selector';

@Component({
  selector: 'app-ranges',
  templateUrl: './ranges.component.html',
  styleUrls: ['./ranges.component.css']
})
export class RangesComponent implements OnInit {

  ranges$: Observable<Range[]>;

  constructor(private rangesCommand: RangesCommand, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.rangesCommand.loadInitialData();
    this.ranges$ = this.store.select(getRanges);
  }

  createRange() {
    let range: Range = {
      initialValue: 10,
      finalValue: 20
    }
    this.rangesCommand.createRange(range);
  }

}
