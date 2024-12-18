import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Quotes as QuotesTypes } from '@/types';
import { Quotes as QuotesAPI } from "@/api";



const QuotesContext = createContext<{
	quotesList: QuotesTypes.Collection[],
	isLoading: boolean,
	lastError: Error | unknown,
	loadPage: (page?: number, count?: number) => void
}>({
	quotesList: [],
	isLoading: false,
	lastError: null,
	loadPage: () => { }
});

export const Context = QuotesContext;
export const Consumer = QuotesContext.Consumer;

export function Provider(props: PropsWithChildren) {
	const [quotesList, setQuotesList] = useState<QuotesTypes.Collection[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [lastError, setLastError] = useState<Error | unknown>(null);

	const loadPage = async (page = 1, count = 30) => {
		if (
			(isLoading) || // a previous request is already in progress
			(quotesList.length >= (page * count)) // requested page has already been loaded
		) {
			return;
		}

		setIsLoading(true);
		try {
			const results = await QuotesAPI.getQuotesList(page, count);
			setQuotesList(results.items);
		} catch (error) {
			setLastError(error);
		}

		setIsLoading(false);
	}

	const quotesContextValue = {
		quotesList,
		isLoading,
		lastError,
		loadPage
	};

	return <QuotesContext.Provider value={quotesContextValue}>
		{props.children}
	</QuotesContext.Provider>
}