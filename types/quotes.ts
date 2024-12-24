export type Customer = {
	address: string;
	city: string;
	country: string;
	email: string;
	name: string;
	phone: string;
};

export type Product = {
	price: number;
	product_name: string;
	quantity: number;
	subtotal: number;
};

export enum Status {
	ACCEPTED = "ACCEPTED",
	REJECTED = "REJECTED",
	EXPIRED = "EXPIRED",
	DRAFT = "DRAFT",
}

export type Collection = {
	collectionId: string;
	collectionName: string;
	created: string;
	customer_info: Customer;
	description?: string;
	id: string;
	items: Array<Product>;
	status: Status;
	subtotal: number;
	total: number;
	total_tax: number;
	updated: string;
	valid_until: string;
};

export type Page = {
	page: number;
	perPage: number;
	// totalItems: number;
	totalPages: number;
	items: Collection[];
};
