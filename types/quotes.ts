export type CollectionCustomer = {
	address: string,
	city: string,
	country: string,
	email: string,
	name: string,
	phone: string
};

export type CollectionItem = {
	price: number
	product_name: string,
	quantity: number
	subtotal: number
}

export enum CollectionStatus {
	ACCEPTED = "ACCEPTED",
	REJECTED = "REJECTED",
	EXPIRED = "EXPIRED",
	DRAFT = "DRAFT"
}

export type Collection = {
	collectionId: string,
	collectionName: string,
	created: string,
	customer_info: CollectionCustomer,
	description?: string,
	id: string,
	items: Array<CollectionItem>,
	status: CollectionStatus,
	subtotal: number,
	total: number,
	total_tax: number,
	updated: string,
	valid_until: string
}
