import type { Page } from "@/types/quotes";
import { RequestStatus } from "@/types/utils";

export default {
	perPage: 25,
	page: 1,
	items: [],
	// totalItems: 0,
	totalPages: 0,
	status: RequestStatus.READY,
} as Page & { status: RequestStatus };
