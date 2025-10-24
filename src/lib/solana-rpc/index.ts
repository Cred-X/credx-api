import {
	IAddressParams,
	IRpcPayload,
	ISignatureParams,
	methodEnum,
	OwnerAssetsParams,
	OwnerAssetsResponse,
} from "@/types/solana-rpc";

export class SolanaApi {
	private static instance: SolanaApi;
	private readonly _id: string;
	private readonly _jsonrpc: string;
	private readonly _rpc = "https://mainnet.helius-rpc.com";

	constructor(private config: { api_key: string }) {
		this._id = "1";
		this._jsonrpc = "2.0";
	}

	public static get_instance({ api_key }: { api_key: string }): SolanaApi {
		if (!SolanaApi.instance) {
			SolanaApi.instance = new SolanaApi({ api_key });
		}
		return SolanaApi.instance;
	}

	private async request_rpc<R, T = any>(
		rpc_payload: IRpcPayload<T>
	): Promise<R> {
		const response = await fetch(this._rpc, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.config.api_key}`,
			},
			body: JSON.stringify(rpc_payload),
		});
		const json = await response.json();
		return json as R;
	}

	public async get_first_transaction_signature(address: string) {
		const payload: IRpcPayload<ISignatureParams> = {
			id: this._id,
			jsonrpc: this._jsonrpc,
			method: methodEnum.getSignaturesForAddress,
			params: [address, { limit: 1, before: null }],
		};
		const data = await this.request_rpc(payload);
		return data;
	}

	public async get_transaction_by_address(address: string) {
		const payload: IRpcPayload<IAddressParams> = {
			id: this._id,
			jsonrpc: this._jsonrpc,
			method: methodEnum.getSignaturesForAddress,
			params: [address],
		};
		const data = await this.request_rpc(payload);
		return data;
	}

	public async get_assets(address: string): Promise<OwnerAssetsResponse> {
		const payload: IRpcPayload<OwnerAssetsParams> = {
			id: this._id,
			jsonrpc: this._jsonrpc,
			method: methodEnum.getAssetsByOwner,
			params: {
				ownerAddress: address,
				page: 1,
				limit: 1,
				sortBy: {
					sortBy: "created",
					sortDirection: "desc",
				},
				options: {
					showUnverifiedCollections: true,
					showCollectionMetadata: true,
					showGrandTotal: true,
					showFungible: true,
					showNativeBalance: true,
					showInscription: true,
					showZeroBalance: true,
				},
			},
		};
		const data = await this.request_rpc<OwnerAssetsResponse, OwnerAssetsParams>(
			payload
		);
		return data;
	}
}
