import * as FileSystem from "expo-file-system";
import * as Network from "expo-network";
import { RequestStatus, type ReduxThunkFn } from "@/types/utils";
import ACTION_TYPES from "@/redux/action-types";
import { getQuotesList } from "@/api/quotes";

export function getPage(page: number): ReduxThunkFn {
	return async function refreshThunk(dispatch, getState) {
		const state = getState();

		dispatch({ type: ACTION_TYPES.QUOTES_GETPAGE, status: RequestStatus.IN_PROGRESS });

		const today = new Date()
			.toISOString() // "2024-12-23T01:23:45.678Z"
			.slice(0, 10); // "2024-12-23"

		// "2024-12-23_p1"
		const cachedFileName = `${FileSystem.cacheDirectory}${today}_p${page}`;
		// console.warn({ cachedFileName });

		return FileSystem.readAsStringAsync(cachedFileName, { encoding: "utf8" })
			.then((cachedFileAsString) => {
				// Cached data available
				const cachedData = JSON.parse(cachedFileAsString);
				dispatch({
					type: ACTION_TYPES.QUOTES_GETPAGE,
					data: cachedData,
					status: RequestStatus.SUCCESS,
					source: "cache",
				});
			})
			.catch(async () => {
				// No cache available, fetch from remote
				const { isConnected, isInternetReachable } = await Network.getNetworkStateAsync();

				if (isConnected && isInternetReachable) {
					const remoteData = await getQuotesList(page, state.quotes.perPage);

					dispatch({
						type: ACTION_TYPES.QUOTES_GETPAGE,
						data: remoteData,
						status: RequestStatus.SUCCESS,
						source: "network",
					});

					await FileSystem.writeAsStringAsync(cachedFileName, JSON.stringify(remoteData), {
						encoding: "utf8",
					});

					return;
				}

				throw new Error("No network connection");
			})
			.catch((e) => {
				// No cache, no remote
				dispatch({
					type: ACTION_TYPES.QUOTES_GETPAGE,
					status: RequestStatus.ERROR,
				});
			});
	};
}

export function create(quote: object): ReduxThunkFn {
	return function createThunk(dispatch, getState) {};
}

export function read(quoteId: string): ReduxThunkFn {
	return function readThunk(dispatch, getState) {};
}

export function update(quoteId: string, data: object): ReduxThunkFn {
	return function updateThunk(dispatch, getState) {};
}

export function remove(quoteId: string): ReduxThunkFn {
	return function removeThunk(dispatch, getState) {};
}
