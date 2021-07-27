import { rangeReducer } from "../ranges/state/ranges.reducer";
import { RangesState } from "../ranges/state/ranges.state";

export interface AppState {
    ranges: RangesState
}

export const AppReducer = {
    ranges: rangeReducer
}