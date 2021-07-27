import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RangesState } from "./ranges.state";

const getRangesState = createFeatureSelector<RangesState>('ranges');

export const getRanges = createSelector(getRangesState, (state) => {
    return state.ranges;
});