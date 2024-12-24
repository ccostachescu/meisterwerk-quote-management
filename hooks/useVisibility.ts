import { useState } from "react";

export default function useVisibility(initialVisibility = false) {
	const [visible, setVisible] = useState(initialVisibility);

	const hide = () => setVisible(false);
	const show = () => setVisible(true);
	const toggle = () => setVisible(!visible);

	return { hide, show, toggle, visible };
}
