import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Range } from '../models/range.model';
import { AppState } from '../store/app.state';
import { RangesCommand } from './state/ranges.command';
import { getRanges } from './state/ranges.selector';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ranges',
  templateUrl: './ranges.component.html',
  styleUrls: ['./ranges.component.css']
})
export class RangesComponent implements OnInit {

  rangeForm: FormGroup;
  ranges$: Observable<Range[]>;

  constructor(private rangesCommand: RangesCommand, private store: Store<AppState>, private fb: FormBuilder) {
    this.rangeForm = this.fb.group({
      initialValue: ['', Validators.required],
      finalValue: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.rangesCommand.loadInitialData();
    this.ranges$ = this.store.select(getRanges);
  }

  createRange() {
    let range: Range = {
      initialValue: Number(this.rangeForm.value.initialValue),
      finalValue: Number(this.rangeForm.value.finalValue)
    };
    this.rangesCommand.createRange(range);
    this.rangeForm.reset();
  }

}
