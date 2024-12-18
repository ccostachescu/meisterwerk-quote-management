import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


interface useKeyboardHeightProps {
	withSafeArea?: boolean,
	offset?: number
}

export default function useKeyboardHeight({ withSafeArea = false, offset = 0 }: useKeyboardHeightProps) {
	const [height, setHeight] = useState(0);
	const safeAreaInsets = useSafeAreaInsets();

	useEffect(() => {
		const keyboardShowListener = Keyboard.addListener("keyboardDidShow", ({ endCoordinates }) => {
			const keyboardHeightWithOffset = endCoordinates.height + offset;
			const safeAreaTopBottom = safeAreaInsets.top + safeAreaInsets.bottom;

			if (withSafeArea === true) {
				// By default, the endCoordinates.height includes top and bottom safe areas
				setHeight(keyboardHeightWithOffset);
			} else {
				setHeight(keyboardHeightWithOffset - safeAreaTopBottom);
			}
		});

		const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => { setHeight(0); });

		return () => {
			try { keyboardShowListener.remove(); }
			catch (e) { Keyboard.removeAllListeners("keyboardDidShow"); }

			try { keyboardHideListener.remove(); }
			catch (e) { Keyboard.removeAllListeners("keyboardDidHide"); }
		}
	}, []);

	return height;
}
