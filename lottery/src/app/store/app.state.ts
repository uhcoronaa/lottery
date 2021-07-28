import { rangeReducer } from "../ranges/state/ranges.reducer";
import { RangesState } from "../ranges/state/ranges.state";
import { winnerReducer } from "../winners/state/winner.reducer";

export interface AppState {
    ranges: RangesState
}

export const AppReducer = {
    ranges: rangeReducer,
    winners: winnerReducer
}