import { AuthOptions, User } from 'shared/types';
import { authenticate } from 'shared/utils';

class AuthApi {
  async fetchUser(options: AuthOptions): Promise<User> {
    const response = await authenticate(options);

    if (response !== undefined) {
      return response;
    }
    const error = 'No user instance in response';
    throw new Error(error);
  }
}

export default AuthApi;
