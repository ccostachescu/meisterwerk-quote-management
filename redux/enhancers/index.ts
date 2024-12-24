import { applyMiddleware } from "redux";
import type { Middleware } from "redux";
import { thunk as thunkMiddleware } from "redux-thunk";
import logger from "./logger";

const MIDDLEWARE_LIST: Array<Middleware> = [];
MIDDLEWARE_LIST.push(thunkMiddleware);
if (process.env.NODE_ENV === "development") {
	MIDDLEWARE_LIST.push(logger);
}

export default applyMiddleware(...MIDDLEWARE_LIST);
