import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Winner } from '../models/winner.model';
import { AppState } from '../store/app.state';
import { WinnersCommand } from './state/winner.command';
import { getWinners } from './state/winner.selector';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.css']
})
export class WinnersComponent implements OnInit {

  options$: Observable<Winner[]>;

  constructor(private winnersCommand: WinnersCommand, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.winnersCommand.loadOptions();
    this.options$ = this.store.select(getWinners);
  }

  generateWinner() {
    this.winnersCommand.createWinner();
  }
}
