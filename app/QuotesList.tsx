import { View, Text, FlatList, Pressable, ViewStyle, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState, useMemo, useContext } from "react";
import Pagination from "@/components/Pagination";
import * as QuotesListCtx from "@/contexts/QuotesListCtx";

function QuoteItem() {
	return <View style={{ width: "100%", height: 40, paddingHorizontal: 16, paddingVertical: 8, borderWidth: 1 }} />
}

export default function QuotesList() {
	const { quotesList, isLoading, lastError, loadPage } = useContext(QuotesListCtx.Context);

	const [currentPage, setCurrentPage] = useState(0);
	const totalPages = useMemo(() => {
		if (quotesList.length < 1){
			return 0;
		}

		const notFullPageItems = quotesList.length % 30;
		const fullPages = (notFullPageItems > 0)
			? ((quotesList.length - notFullPageItems) / 30) + 1
			: (quotesList.length / 30);
		
		return fullPages
	}, [quotesList]);

	const loadPrevPage = () => { setCurrentPage(currentPage - 1) }
	const loadNextPage = () => { setCurrentPage(currentPage + 1); }

	useEffect(() => {
		loadPage(currentPage);
	}, [currentPage]);

	const safeAreaInsets = useSafeAreaInsets();
	const safeAreaHeader: ViewStyle = {
		paddingTop: safeAreaInsets.top,
		paddingLeft: safeAreaInsets.left,
		paddingRight: safeAreaInsets.right
	};
	const safeAreaContent: ViewStyle = {
		paddingLeft: safeAreaInsets.left,
		paddingRight: safeAreaInsets.right
	};
	const safeAreaFooter: ViewStyle = {
		paddingBottom: safeAreaInsets.bottom,
		paddingLeft: safeAreaInsets.left,
		paddingRight: safeAreaInsets.right
	};

	return <View style={[safeAreaHeader, { flex: 1 }]}>
		<View style={{ width: "100%" }}>
			<Text style={{ textAlign: "center", fontSize: 24 }}>Quotes List</Text>
		</View>
		<FlatList
			style={{ flex: 1 }}
			contentContainerStyle={[safeAreaContent, { flexGrow: 1 }]}
			renderItem={QuoteItem}
			data={quotesList}
			// data={[1, 2, 3, 4, 5, 6]}
			refreshing={isLoading}
			onRefresh={loadNextPage}
			ListFooterComponent={isLoading ? <View>
				<Text>Loading...</Text>
			</View> : null}
			ListFooterComponentStyle={{ position: "absolute", bottom: 0, alignSelf: "center" }}
		/>
		<View style={[safeAreaFooter, { width: "100%" }]}>
			<Pagination current={currentPage} total={totalPages} onPrevPress={loadPrevPage} onNextPress={loadNextPage} />
		</View>
	</View>;
}