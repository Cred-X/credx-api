export enum methodEnum {
	"getTransaction",
	"getSignaturesForAddress",
	"getAssetsByOwner",
}

export interface IRpcPayload<T> {
	jsonrpc: string;
	id: string;
	method: methodEnum;
	params: T;
}

export type IAddressParams = string[];

export type ISignatureParams = [
	string,
	{
		limit?: number;
		before?: string | null;
		commitment?: "finalized" | "confirmed";
	}
];

export interface OwnerAssetsParams {
	ownerAddress: string;
	page: number;
	limit: number;
	sortBy: SortBy;
	options: Options;
}

interface SortBy {
	sortBy: string;
	sortDirection: "asc" | "desc";
}

interface Options {
	showUnverifiedCollections: boolean;
	showCollectionMetadata: boolean;
	showGrandTotal: boolean;
	showFungible: boolean;
	showNativeBalance: boolean;
	showInscription: boolean;
	showZeroBalance: boolean;
}

/*----------- Response ------------- */



/* OwnerAssetsResponse  */
export interface OwnerAssetsResponse {
	jsonrpc: string;
	result: OwnerAssetsResult;
	id: string | number | null;
}

export interface OwnerAssetsResult {
	last_indexed_slot: number;
	total: number;
	limit: number;
	page: number;
	items: AssetItem[];
}

export interface AssetItem {
	interface: string;
	id: string;
	content?: Record<string, any> | null;
	authorities?: Array<{
		address: string;
		scopes: string[];
	}>;
	compression?: Record<string, any>;
	grouping?: Array<{
		group_key: string;
		group_value: string;
	}>;
	royalty?: Record<string, any>;
	creators?: Array<{
		address: string;
		share: number;
		verified: boolean;
	}>;
	ownership?: Record<string, any>;
	supply?: Record<string, any>;
	mutable?: boolean;
	burnt?: boolean;
}
