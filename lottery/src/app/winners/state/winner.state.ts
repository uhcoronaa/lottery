import { Winner } from "src/app/models/winner.model";

export interface WinnersState {
    winners: Winner[]
}

export const initialState: WinnersState = {
    winners: [{
        option: 1,
        winner: true
    },{
        option: 2,
        winner: false
    },{
        option: 3,
        winner: true
    }]
}