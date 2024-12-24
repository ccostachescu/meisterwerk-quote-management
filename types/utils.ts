import { initialState } from "@/redux";
import type { Action, UnknownAction } from "redux";
import type { ThunkAction } from "redux-thunk";

export type ReduxThunkFn<ReturnType = void> = ThunkAction<
	ReturnType,
	typeof initialState,
	unknown,
	UnknownAction
>;

export type ReduxAction<T extends object> = Action & T;

export enum RequestStatus {
	READY = "READY",
	IN_PROGRESS = "IN_PROGRESS",
	SUCCESS = "SUCCESS",
	ERROR = "ERROR",
}
