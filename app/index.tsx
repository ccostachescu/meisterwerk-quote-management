import useKeyboardHeight from "@/hooks/useKeyboardHeight";
import { useNavigation } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "@/theme";

const styles = StyleSheet.create({
	mainContainer: { flex: 1 },
	mainContentContainer: {
		flexGrow: 1,
		justifyContent: "space-around",
		gap: 32
	},

	logoContainer: { width: "100%" },
	logo: {
		flex: 0,
		alignSelf: "center",
		alignItems: "flex-end",
		backgroundColor: "#EEE",
		borderWidth: 1,
		borderRadius: 12,
		paddingHorizontal: 32,
		paddingVertical: 16
	},
	logoTextBrand: { fontSize: 32 },
	logoTextProduct: { fontSize: 24 },

	loginForm: {
		flex: 1,
		gap: 32,
		justifyContent: "center"
	},

	signUpForm: {
		width: "100%",
		alignItems: "center",
		gap: 8
	}
});

export default function Index() {
	const safeAreaInsets = useSafeAreaInsets();
	const keyboardHeight = useKeyboardHeight({});
	const navigation = useNavigation();
	const navigateToQuotesList = () => {
		navigation.navigate("QuotesList");
	}

	return (
		<ScrollView
			style={styles.mainContainer}
			contentContainerStyle={styles.mainContentContainer}
			keyboardDismissMode="interactive"
			keyboardShouldPersistTaps="handled"
		>
			<View style={[styles.logoContainer, { paddingTop: safeAreaInsets.top }]}>
				<View style={styles.logo}>
					<Text style={styles.logoTextBrand}>Meisterwerk</Text>
					<Text style={styles.logoTextProduct}>Quotes</Text>
				</View>
			</View>

			<View style={[styles.loginForm, { paddingLeft: safeAreaInsets.left + 32, paddingRight: safeAreaInsets.right + 32 }]}>
				<View style={{ width: "100%", gap: 16 }}>
					<TextInput style={theme.textInput} placeholder="Username" />
					<TextInput style={theme.textInput} placeholder="Password" />
				</View>
				<Pressable style={[theme.button, { width: "100%" }]} onPress={navigateToQuotesList}>
					<Text style={theme.buttonText}>LOGIN</Text>
				</Pressable>
			</View>

			<View style={[styles.signUpForm, {
				paddingBottom: safeAreaInsets.bottom,
				paddingLeft: safeAreaInsets.left + 32,
				paddingRight: safeAreaInsets.right + 32,
			}]}>
				<Text>Don't have an account?</Text>
				<Pressable style={[theme.button, { width: "100%" }]}>
					<Text style={theme.buttonText}>SIGN UP</Text>
				</Pressable>
			</View>
			<View style={{ width: "100%", height: keyboardHeight }} />
		</ScrollView>
	);
}
