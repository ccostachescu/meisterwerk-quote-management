import { Stack } from "expo-router";
import { store } from "@/redux";
import { Provider as ReduxProvider } from "react-redux";

export default function RootLayout() {
	return (
		<ReduxProvider store={store}>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="index" />
				<Stack.Screen name="quotes-list" />
				<Stack.Screen name="create-quote" options={{ presentation: "modal" }} />
			</Stack>
		</ReduxProvider>
	);
}
