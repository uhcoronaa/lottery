import { createAction, props } from "@ngrx/store";
import { Range } from "src/app/models/range.model";

export const createRange = createAction('createRange', props<{ range: Range }>());

export const loadRanges = createAction('LoadRanges', props<{ ranges: Range[] }>());