import BaseService from './BaseService';

class PortfolioService extends BaseService {
  constructor(domain, params) {
    super();
    this.url = `${domain}`;
    this.params = params;
  }

  getPortfolios(id){
    const url = `${this.url}/users/${id}`;
    const action = '';
    const response = this.get(action, '', url);
    return response;
  }

  addPortofilo(body){
    const url = `${this.url}/portfolios`;
    const response = this.post(JSON.stringify(body),'', url);
    return response;
   }

   getHistory90Days(id, investNumber){
    const params = investNumber ? [{ key: 'invest_number', value: investNumber }] : '';
    const url = `${this.url}/portfolios/${id}/data_ninety_days`;
    const response = this.get('', params, url);
    return response;
   }

}

export default PortfolioService;