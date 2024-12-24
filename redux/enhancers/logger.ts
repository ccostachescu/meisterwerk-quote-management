import type { Middleware } from "redux";

const logger: Middleware = (store) => (next) => (action) => {
	// prettier-ignore
	const actionDetails = (typeof action === "function")
		? `${action.name || "anonymous"}`
		// @ts-expect-error custom action object has at least { type: string }
		: (action as object).type;

	console.log(
		"[redux::logger] Dispatched",
		actionDetails
		// JSON.stringify(action as object, null, 2)
	);
	return next(action);
};

export default logger;
