import { Component, OnInit } from '@angular/core';
import { Range } from '../models/range.model';
import { RangesCommand } from './state/ranges.command';

@Component({
  selector: 'app-ranges',
  templateUrl: './ranges.component.html',
  styleUrls: ['./ranges.component.css']
})
export class RangesComponent implements OnInit {

  constructor(private rangesCommand: RangesCommand) { }

  ngOnInit(): void {
    this.rangesCommand.loadInitialData();
  }

  createRange() {
    let range: Range = {
      initialValue: 10,
      finalValue: 20
    }
    this.rangesCommand.createRange(range);
  }

}
