import { Winner } from "src/app/models/winner.model";

export interface WinnersState {
    winners: Winner[]
}

export const initialState: WinnersState = {
    winners: []
}