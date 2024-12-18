import PocketBase, { RecordListOptions } from 'pocketbase';
import { Quotes as QuotesTypes } from '@/types';

const pocketbaseConnection = new PocketBase('http://127.0.0.1:8090');
const Quotes = pocketbaseConnection.collection<QuotesTypes.Collection>("quotes");

export async function getQuotesList(page = 1, count = 30, options?: RecordListOptions) {
	return Quotes.getList(page, count, options);
}

export async function createQuote(quote: QuotesTypes.Collection) {
	return Quotes.create(quote);
}