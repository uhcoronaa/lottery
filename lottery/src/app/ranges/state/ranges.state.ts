import { Range } from "src/app/models/range.model";

export interface RangesState {
    ranges: Range[]
}

export const initialState: RangesState = {
    ranges: []
}