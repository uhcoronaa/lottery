import { createAction, props } from "@ngrx/store";
import { Winner } from "src/app/models/winner.model";

export const createWinner = createAction('createWinner', props<{ winner: Winner }>());

export const loadWinners = createAction('loadWinners', props<{ winners: Winner[] }>());