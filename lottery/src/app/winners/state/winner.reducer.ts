import { createReducer, on } from "@ngrx/store";
import { createWinner, loadWinners } from "./winner.action";
import { initialState } from "./winner.state";

const _winnerReducer = createReducer(
    initialState,
    on(createWinner, (state, action) => {

        let updatedWinners = state.winners.map(winner => {
            return winner.option == action.winner.option ? action.winner : winner;
        });
        return {
            ...state,
            winners: updatedWinners
        }
    }),
    on(loadWinners, (state, action) => {
        return {
            ...state,
            winners: action.winners
        }
    })
)

export function winnerReducer(state, action) {
    return _winnerReducer(state, action);
}