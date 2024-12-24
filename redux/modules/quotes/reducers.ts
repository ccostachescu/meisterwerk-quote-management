import type { Action } from "redux";
import { combineReducers } from "redux";
import ACTION_TYPES from "@/redux/action-types";
import { ReduxAction, RequestStatus } from "@/types/utils";
import { Page } from "@/types/quotes";
import initialState from "./initial-state";

type QuoteAction = ReduxAction<{ data?: Page; status: RequestStatus }>;

function perPage(state = initialState.perPage) {
	return state;
}

function page(state = initialState.page, action: Action) {
	switch (action.type) {
		case ACTION_TYPES.QUOTES_GETPAGE: {
			const { data } = action as QuoteAction;

			return data?.page || state;
		}

		default:
			return state;
	}
}

function totalPages(state = initialState.totalPages, action: Action) {
	switch (action.type) {
		case ACTION_TYPES.QUOTES_GETPAGE: {
			const { data } = action as QuoteAction;
			return data?.totalPages || state;
		}

		default:
			return state;
	}
}

function items(state = initialState.items, action: Action) {
	switch (action.type) {
		case ACTION_TYPES.QUOTES_GETPAGE: {
			const { data } = action as QuoteAction;
			return data?.items || state;
		}

		default:
			return state;
	}
}

function status(state = initialState.status, action: Action) {
	switch (action.type) {
		case ACTION_TYPES.QUOTES_GETPAGE: {
			const { status } = action as QuoteAction;
			return status;
		}

		default:
			return state;
	}
}

export default combineReducers({
	perPage,
	page,
	totalPages,
	items,
	status,
});
