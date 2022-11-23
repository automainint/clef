import { Resource } from 'shared/types';
import { getResourceByID } from 'shared/utils';

class ResourcesApi {
  async fetchResourceByID(id: string): Promise<Resource | null> {
    const response = await getResourceByID(id);

    if (response !== undefined) {
      return response;
    }
    const error = 'getResourceByID not responding';
    throw new Error(error);
  }
}

export default ResourcesApi;
