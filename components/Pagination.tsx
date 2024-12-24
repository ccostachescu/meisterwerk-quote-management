import { View, Text, Pressable } from "react-native";
import theme from "@/theme";

interface PaginationProps {
	current?: number;
	total?: number;
	disabled?: boolean;
	onPrevPress?: () => void;
	onCurrPress?: () => void;
	onNextPress?: () => void;
}

export default function Pagination({
	current = 1, // 1-indexed
	total = 1, // 1-indexed
	disabled = false,
	onPrevPress,
	onCurrPress,
	onNextPress,
}: PaginationProps) {
	const isFirstPage = current < 2;
	const isLastPage = current >= total;
	const hasOnlyOnePage = total <= 2;

	if (total === 0) {
		return null;
	}

	return (
		<View
			style={{
				width: "100%",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				gap: 16,
				paddingHorizontal: 32,
				paddingVertical: 16,
			}}
		>
			<Pressable
				onPress={onPrevPress}
				disabled={disabled || isFirstPage}
				style={[
					theme.button,
					{
						paddingHorizontal: 0,
						paddingVertical: 0,
						width: 40,
						height: 40,
						opacity: disabled || isFirstPage ? 0.5 : 1.0,
					},
				]}
			>
				<Text style={[theme.buttonText, { fontSize: 24, lineHeight: 24 }]}>{"<"}</Text>
			</Pressable>

			<Pressable
				disabled={disabled || hasOnlyOnePage}
				style={[
					theme.button,
					{ flex: 1, height: 40, opacity: disabled || hasOnlyOnePage ? 0.5 : 1.0 },
				]}
				onPress={onCurrPress}
			>
				<Text style={theme.buttonText}>{`Page ${current} of ${total}`}</Text>
			</Pressable>

			<Pressable
				onPress={onNextPress}
				disabled={disabled || isLastPage}
				style={[
					theme.button,
					{
						paddingHorizontal: 0,
						paddingVertical: 0,
						width: 40,
						height: 40,
						opacity: disabled || isLastPage ? 0.5 : 1.0,
					},
				]}
			>
				<Text style={[theme.buttonText, { fontSize: 24, lineHeight: 24 }]}>{">"}</Text>
			</Pressable>
		</View>
	);
}
