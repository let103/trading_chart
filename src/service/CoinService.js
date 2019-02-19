import BaseService from './BaseService';

class CoinService extends BaseService {
  constructor(domain, params) {
    super();
    this.url = `${domain}`;
    this.params = params;
  }

 getTop30Coin(){
  const url = `${this.url}/crytocurrencies/data_for_table_sum_chart`;
  const action = '';
  const response = this.get(action,'', url);
  return response;
 }

 getCoinByPortofiloId(id){
  const url = `${this.url}/portfolios/${id}`;
  const action = '';
  const response = this.get(action,'', url);
  return response;
 }

 addCoinByPortofiloId(id, body){
  const url = `${this.url}/portfolios/${id}/add_portfolio_item`;
  const response = this.post(JSON.stringify(body),'', url);
  return response;
 }

 deleteCoinByPortofiloId(id, body){
  const url = `${this.url}/portfolios/${id}/delete_portfolio_item`;
  const response = this.delete(JSON.stringify(body),'', url);
  return response;
 }

 getCoinByName(symbol){
  const url = `${this.url}/crytocurrencies?symbol=${symbol}`;
  const action = '';
  const response = this.get(action,'', url);
  return response;
 }

 getDetailCoin(symbols){
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&fsyms=${symbols}`;
    const action = '';
    const response = this.get(action,'', url);
    return response;
  }
}
export default CoinService;