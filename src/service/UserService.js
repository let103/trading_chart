import BaseService from './BaseService';

class UserService extends BaseService {
  constructor(domain, params) {
    super();
    this.url = `${domain}`;
    this.params = params;
  }

  getAll() {
    const url = `${this.url}/users`;
    const action = '';
    const response = this.get(action,'', url);
    return response;
  }

  create(body){
    const url = `${this.url}/auth/sign_up`;
    const response = this.post(JSON.stringify(body),'', url);
    return response;
  }
}

export default UserService;