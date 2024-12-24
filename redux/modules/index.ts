import { combineReducers } from "redux";
import * as quotes from "./quotes";

export const initialState = {
	quotes: quotes.initialState,
};

export const actions = {
	quotes: quotes.actions,
};

export const reducers = combineReducers({
	quotes: quotes.reducers,
});
