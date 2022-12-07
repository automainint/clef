import { Resource } from 'shared/types';
import { getResourceByAssetID, getResourceByID, getSongRarityByAssetID } from 'shared/utils';

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
}

export default ResourcesApi;
