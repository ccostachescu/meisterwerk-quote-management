import { View, Text, Pressable } from "react-native";
import theme from "@/theme";

interface PaginationProps {
	current?: number,
	total?: number,
	onPrevPress?: () => void,
	onCurrPress?: () => void,
	onNextPress?: () => void
}

export default function Pagination({
	current = 0, // 0-indexed
	total = 0,   // 1-indexed
	onPrevPress,
	onCurrPress,
	onNextPress
}: PaginationProps) {
	const isFirstPage = (current < 1);
	const isLastPage = (current >= (total - 1));
	const hasOnlyOnePage = (total <= 1);

	if (total === 0) {
		return null;
	}

	return <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 16, paddingHorizontal: 32, paddingVertical: 16 }}>
		<Pressable onPress={onPrevPress} disabled={isFirstPage} style={[
			theme.button,
			{ paddingHorizontal: 0, paddingVertical: 0, width: 40, height: 40, opacity: isFirstPage ? 0.5 : 1.0 }
		]}>
			<Text style={[theme.buttonText, { fontSize: 24, lineHeight: 24 }]}>{"<"}</Text>
		</Pressable>

		<Pressable
			disabled={hasOnlyOnePage}
			style={[theme.button, { flex: 1, height: 40, opacity: hasOnlyOnePage ? 0.5 : 1.0 }]}
			onPress={onCurrPress}
		>
			<Text style={theme.buttonText}>{`Page ${current + 1} of ${total}`}</Text>
		</Pressable>

		<Pressable
			onPress={onNextPress}
			disabled={current >= total}
			style={[
				theme.button,
				{ paddingHorizontal: 0, paddingVertical: 0, width: 40, height: 40, opacity: isLastPage ? 0.5 : 1.0 }
			]}
		>
			<Text style={[theme.buttonText, { fontSize: 24, lineHeight: 24 }]}>{">"}</Text>
		</Pressable>
	</View>
}
