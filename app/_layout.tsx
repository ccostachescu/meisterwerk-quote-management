import { Stack } from "expo-router";
import * as QuotesListCtx from "@/contexts/QuotesListCtx";



export default function RootLayout() {
	return <QuotesListCtx.Provider>
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
			<Stack.Screen name="QuotesList" />
		</Stack>
	</QuotesListCtx.Provider>;
}
