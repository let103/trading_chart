import { isEmpty, forEach } from 'lodash';
import { handleFetchData } from '../utils/fetch-lib';

class BaseService {
  constructor() {
    this.config = {
      headers: {
        'Content-Type': 'application/json;application/x-www-form-urlencoded',
        'X-CMC_PRO_API_KEY':  'd087ad99-3ded-48d2-8913-5b662a697f93'
      },
    };
  }

  parsingParams(params) {
    let paramString = '';
    if (!isEmpty(params)) {
      paramString = '?';

      forEach(params, (param) => {
        paramString += `${param.key}=${param.value}&`;
      });

      paramString = paramString.substr(0, paramString.length - 1);
    }

    return paramString;
  }

  parsingFormData(body) {
    let formData = new FormData();
    if (!isEmpty(body)) {
      forEach(body, (value, key) => {
        formData.set(key, value);
      });
      formData.append('isNotEmpty', true);
    } else {
      formData = '';
    }

    return formData;
  }

  get(action = '', params = '', url) {
    const paramString = this.parsingParams(params);
    if (!isEmpty(action)) {
      url += `/${action}`;
    }

    if (!isEmpty(paramString)) {
      url += paramString;
    }
  
    return handleFetchData(url, 'GET', '', this.config.headers);
  }

  post(dataBody, action = '', url = '') {
    if (!isEmpty(action)) {
      url += `/${action}`;
    }
   
    return handleFetchData(url, 'POST', dataBody, {});
  }

  delete(dataBody, action = '', url = '') {
    if (!isEmpty(action)) {
      url += `/${action}`;
    }

    return handleFetchData(url, 'DELETE', dataBody, {});
  }
}

export default BaseService;