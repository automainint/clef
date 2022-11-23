import AuthApi from './modules/AuthApi';
import ResourcesApi from './modules/ResourcesApi';
import UserApi from './modules/UserApi';

class Api {
  authApi = new AuthApi();

  resourcesApi = new ResourcesApi();

  userApi = new UserApi();
}

export { Api };
