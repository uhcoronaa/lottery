import { createFeatureSelector, createSelector } from "@ngrx/store";
import { WinnersState } from "./winner.state";

const getWinnersState = createFeatureSelector<WinnersState>('winners');

export const getWinners = createSelector(getWinnersState, (state) => {
    return state.winners;
});