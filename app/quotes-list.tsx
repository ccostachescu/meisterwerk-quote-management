import { View, Text, FlatList, ViewStyle, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect } from "react";
import Pagination from "@/components/Pagination";
import { connect } from "react-redux";
import { actions, initialState } from "@/redux";
import { RequestStatus } from "@/types/utils";
import { useNetworkState } from "expo-network";
import { Collection } from "@/types/quotes";
import theme from "@/theme";

function QuoteItem({ item }: { item: Collection }) {
	return (
		<View
			style={{
				width: "100%",
				paddingHorizontal: 16,
				paddingVertical: 8,
				borderWidth: 1,
			}}
		>
			<Text>{`ID: ${item.collectionId}`}</Text>
			<Text>{`Date: ${item.created}`}</Text>
			<Text>{`Total: ${item.total.toFixed(2)}`}</Text>
			<Text>{`Status: ${item.status}`}</Text>
		</View>
	);
}

export default connect(
	(state: typeof initialState) => state.quotes,
	actions.quotes
)((__props) => {
	const { isConnected = true, isInternetReachable = true } = useNetworkState();

	const { page, totalPages, items, status, getPage } = __props as typeof initialState.quotes &
		typeof actions.quotes;

	const loadPrevPage = () => {
		getPage(page - 1);
	};

	const loadNextPage = () => {
		getPage(page + 1);
	};

	const refreshCurrentPage = () => {
		getPage(page);
	};

	useEffect(refreshCurrentPage, []);

	const isInProgress = status === RequestStatus.IN_PROGRESS;
	const isOffline = isConnected === false || isInternetReachable === false;

	const safeAreaInsets = useSafeAreaInsets();
	const safeAreaHeader: ViewStyle = {
		paddingTop: safeAreaInsets.top,
		paddingLeft: safeAreaInsets.left,
		paddingRight: safeAreaInsets.right,
	};
	const safeAreaContent: ViewStyle = {
		paddingLeft: safeAreaInsets.left,
		paddingRight: safeAreaInsets.right,
	};
	const safeAreaFooter: ViewStyle = {
		paddingBottom: safeAreaInsets.bottom,
		paddingLeft: safeAreaInsets.left,
		paddingRight: safeAreaInsets.right,
	};

	return (
		<View style={[safeAreaHeader, { flex: 1 }]}>
			<View style={{ width: "100%" }}>
				<Text style={{ textAlign: "center", fontSize: 24 }}>Quotes List</Text>
			</View>
			<FlatList
				style={{ flex: 1 }}
				contentContainerStyle={[safeAreaContent, { flexGrow: 1 }]}
				renderItem={QuoteItem}
				data={items}
				refreshing={isInProgress}
				keyExtractor={(item, index) => `${item.collectionId}_${index}`}
				onRefresh={refreshCurrentPage}
				ListHeaderComponentStyle={{ position: "absolute", top: 0, alignSelf: "center" }}
				ListHeaderComponent={
					isOffline ? <Text>It seems you are offline. Showing last available results.</Text>
					: status === RequestStatus.ERROR ?
						<Text>An error occurred while fetching the data</Text>
					:	null
				}
				ListFooterComponent={
					isInProgress ?
						<View>
							<Text>Loading...</Text>
						</View>
					:	null
				}
				ListFooterComponentStyle={{ position: "absolute", bottom: 0, alignSelf: "center" }}
			/>
			<View style={[safeAreaFooter, { width: "100%" }]}>
				<Pagination
					disabled={isInProgress}
					current={page}
					total={totalPages}
					onPrevPress={loadPrevPage}
					onNextPress={loadNextPage}
				/>
			</View>
		</View>
	);
});
