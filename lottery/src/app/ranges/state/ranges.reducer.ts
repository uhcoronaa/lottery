import { createReducer, on } from "@ngrx/store";
import { createRange, loadRanges } from "./ranges.action";
import { initialState } from "./ranges.state";

const _rangeReducer = createReducer(
    initialState,
    on(createRange, (state, action) => {
        return {
            ...state,
            ranges: [...state.ranges, action.range]
        }
    }),
    on(loadRanges, (state, action) => {
        return {
            ...state,
            ranges: action.ranges
        }
    })
)

export function rangeReducer(state, action) {
    return _rangeReducer(state, action);
}