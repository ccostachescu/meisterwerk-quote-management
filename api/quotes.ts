import PocketBase, { RecordListOptions } from "pocketbase";
import { Quotes as QuotesTypes } from "@/types";

const pocketbaseConnection = new PocketBase("http://127.0.0.1:8090");
const Quotes = pocketbaseConnection.collection<QuotesTypes.Collection>("quotes");

export async function getQuotesList(page = 1, count = 30, options?: RecordListOptions) {
	const controller = new AbortController();

	return Promise.race([
		new Promise((r) => {
			setTimeout(r, 2500);
		}).then(() => {
			return Quotes.getList(page, count, { signal: controller.signal });
		}),
		new Promise((resolve, reject) => {
			setTimeout(() => {
				console.warn("Request timeout");
				controller.abort("Request timeout");
				resolve("Request timeout");
			}, 10000);
		}),
	]).then((result) => {
		// console.warn(JSON.stringify(result, null, 2));
		return result;
	});
}

export async function createQuote(quote: QuotesTypes.Collection) {
	return Quotes.create(quote);
}
