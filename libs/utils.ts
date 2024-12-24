import * as FileSystem from "expo-file-system";

export function getCachedPageFileUrl(page: number): string {
	const today = new Date()
		.toISOString() // "2024-12-23T01:23:45.678Z"
		.slice(0, 10); // "2024-12-23"

	// "2024-12-23_p1"
	return `${FileSystem.cacheDirectory}${today}_p${page}`;
}
