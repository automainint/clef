import { ChartList, isCurrency, Currency, Resource } from 'shared/types';
import {
  getChart,
  getMintableSongs,
  getMintPrice,
  getMintQuantity,
  getMintType,
  getResourceByAssetID,
  getResourceByID,
  getSongRarityByAssetID,
} from 'shared/utils';

class ResourcesApi {
  async fetchResourceByID(id: string): Promise<Resource | null> {
    const response = await getResourceByID(id);

    if (response !== undefined) {
      return response;
    }
    const error = 'getResourceByID not responding';
    throw new Error(error);
  }

  async fetchResourceByAssetID(assetID: string): Promise<Resource | null> {
    const response = await getResourceByAssetID(assetID);

    if (response !== undefined) {
      return response;
    }
    const error = 'getResourceByAssetID not responding';
    throw new Error(error);
  }

  async fetchSongRarityByAssetID(assetID: string): Promise<number> {
    const response = await getSongRarityByAssetID(assetID);

    if (response !== undefined) {
      return response;
    }
    const error = 'getSongRarityByAssetID not responding';
    throw new Error(error);
  }

  async fetchMintableSongAssetIDs(): Promise<string[]> {
    const response = await getMintableSongs();

    if (response !== undefined) {
      return response;
    }
    const error = 'getMintableSongs not responding';
    throw new Error(error);
  }

  async fetchMintTypeByAssetID(assetID: string): Promise<string> {
    const response = await getMintType(assetID);

    if (response !== undefined) {
      return response;
    }
    const error = 'getMintType not responding';
    throw new Error(error);
  }

  async fetchMintPriceByAssetID(assetID: string): Promise<Currency> {
    const response = await getMintPrice(assetID);

    if (response !== undefined && isCurrency(response)) {
      return response;
    }
    const error = 'getMintPrice not responding';
    throw new Error(error);
  }

  async fetchMintQuantityByAssetID(assetID: string): Promise<number> {
    const response = await getMintQuantity(assetID);

    if (response !== undefined) {
      return response;
    }
    const error = 'getMintQuantity not responding';
    throw new Error(error);
  }

  async fetchChart(): Promise<ChartList> {
    const response = await getChart();

    if (response !== undefined) {
      return response;
    }
    const error = 'getChart not responding';
    throw new Error(error);
  }
}

export default ResourcesApi;
