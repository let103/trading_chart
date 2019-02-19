import React, { Component } from 'react';
import { Table, Button, FormControl, Form, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import { head } from 'lodash';
import { fetchCoinByName, addCoinByPortfoliosId, deleteCoinByPortfoliosId } from '../../../../store/coin_detail/actionCreator';
import { fetchCoinByNameSelector } from '../../../../store/coin_detail/selectors';
import ChartCoin from '../../../../components/ChartCoin/ChartCoin';
import './Item.css';
import loadingIcon from '../../../../img/loading.gif';

class Item extends Component {
    static defaultProps = {
        items: []
    };

    constructor(props){
        super(props);
        this.state = {
            portFoliosId: props.portFoliosId,
            symbol: '',
            selectedCoin: '',
            searchCoinList: [],
            timeout: 0,
            items: [],
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            loading: true
        });

        const coin = document.getElementById('coinName').value;
        
        if(nextProps.items.length > 0){
            this.setState({
                symbol: head(nextProps.items).symbol,
            });
        }

        this.setState({
            items: nextProps.items,
            searchCoinList: nextProps.searchCoinList,
        });

        setTimeout(() => {
            this.setState({
                loading: false
            });
        }, 1000);
       

        if(!coin){
            this.setState({
                searchCoinList: [],
            });
        }
       
    }

    componentDidMount(){
        this.setState({
            loading: true
        });
    }

    selectedSymbol = (selectedSymbol) => {
		this.setState({
			symbol: selectedSymbol
		});
    }
    
    getCoinInput = (event) => {
        const { target: { value } } = event;
        this.props.fetchCoinListByName(value);
    }

    selectedCoin = (coin) => {
        document.getElementById('coinName').value = coin.attributes.cryto_name.trim();
        
        this.setState( (prevState) => {
            return {
                ...prevState,
                selectedCoin: coin,
                searchCoinList: [] 
            }
        });    
    }

    formartMarketToArray = (market) => {
        return market.replace(/]|"/g,'').slice(1).split(',');
    }

    numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    handleAddCoin = () => {
        const { items, selectedCoin } = this.state;
        if(items.length >= 30){
            alert('The coin list is full.');
            return;
        }

        const newCoin = selectedCoin;

        if(!document.getElementById('coinName').value){
            alert('Please enter a coin name');
            return;
        }
       
        const { portFoliosId } = this.props;
    
        const result = items.filter( (item) => {
            return item.symbol === newCoin.attributes.cryto_name.trim();
        });

        if(result.length > 0) 
            alert('The coin already existed in your portfolio list');
        else{
            const payload = {
                id: portFoliosId,
                body: {
                    portfolio_item : {
                        name: newCoin.attributes.cryto_name.trim(),
                        symbol: this.formartMarketToArray(newCoin.attributes.market.trim())[0],
                        symbol_crypto: newCoin.attributes.symbol,
                        cryto_id: newCoin.id
                    }
                }
            };
            this.props.addCoinByPortfoliosIdAction(payload);
            this.props.fetchHistoryPortfolios90Days(portFoliosId);

            document.getElementById('coinName').value = '';
        } 
    }

    handleDeleteCoin = (coinId) => {
        const { items } = this.state;
       
        const { portFoliosId } = this.props;
    
        const result = items.filter( (item) => {
            return item.id == coinId;
        });
     
        if(result.length === 0) 
            alert('The coin is not existed in your portfolio list');
        else{
            const payload = {
                id: portFoliosId,
                body: {
                    portfolio_item_id : parseInt(coinId)
                }
            };
            
            this.props.deleteCoinByPortfoliosIdAction(payload);
        } 
    }

    sortDataDesc = (field) => {
        const { items } = this.props;
            this.setState({
                items: items.sort( (a,b) => (b[field] > a[field]) ? 1 : ( (b[field] < a[field]) ? -1 : 0 )   )
            })
    }

    sortDataAsc = (field) => {
        const { items } = this.props;
            this.setState({
                items: items.sort( (a,b) => (b[field] < a[field]) ? 1 : ( (b[field] > a[field]) ? -1 : 0 )   )
            })
    }

    render() {
        const { symbol, searchCoinList, items, loading } = this.state;
        let i = 0;
        return (
            <React.Fragment>
                   <div style={{ margin: '20px 0', overflow: 'hidden'}}>
                        <Form inline>
                            <Col md={2} style={{ width: 240 }}>
                                    <FormControl type="text" id="coinName" autoComplete="off" placeholder="Enter a coin name" style={{ width: '100%' }} onChange={this.getCoinInput} />
                            </Col>
                            <Col md={2}>
                                <Button bsStyle="primary" onClick={ this.handleAddCoin }> Add </Button>
                            </Col>
                        </Form>
                    </div>
                <div className="row coin-list-section">    
                        {
                            searchCoinList.length > 0 && 
                                <ul className="coin-list-wrapper" style={{ overflow: 'auto', maxHeight: '300px' }}>
                                    { searchCoinList.map( (coin) => {
                                        if(coin.attributes.market !== '[]'){
                                            const market = this.formartMarketToArray(coin.attributes.market);
                                            return market.map( (marketName) => {
                                                return (<li onClick={ () => this.selectedCoin(coin)}> { marketName } </li>)
                                            });
                                        }
                                    }) }
                                </ul>
                        }
                    <div className="col-sm-12 col-md-3 col-lg-3 coin-list-section-left">
                        <div className="coin-list-table-section">       
                            <Table striped condensed hover bsClass="table table-width">
                            <thead>
                                <tr>
                                    <th style={{ color: "#999"}}> Rank </th>
                                    <th> 
                                        COMPONENTS 
                                        <span class="sort-section">
                                            <i class="fa fa-caret-up sort-icon sort-icon-left" onClick={ () => this.sortDataAsc('name')}></i> 
                                            <i class="fa fa-caret-down sort-icon sort-icon-right" onClick={ () => this.sortDataDesc('name')}></i> 
                                        </span>
                                    </th>
                                    <th style={{ color: "#999"}}>
                                        Last
                                        <span class="sort-section">
                                            <i class="fa fa-caret-up sort-icon sort-icon-left" onClick={ () => this.sortDataAsc('last')}></i> 
                                            <i class="fa fa-caret-down sort-icon sort-icon-right" onClick={ () => this.sortDataDesc('last')}></i> 
                                        </span>
                                    </th>
                                    <th style={{ color: "#999"}}>
                                        Change 
                                        <span class="sort-section">
                                            <i class="fa fa-caret-up sort-icon sort-icon-left" onClick={ () => this.sortDataAsc('change')}></i> 
                                            <i class="fa fa-caret-down sort-icon sort-icon-right" onClick={ () => this.sortDataDesc('change')}></i> 
                                        </span>
                                    </th>
                                    <th style={{ color: "#999"}}>
                                        MarketCap 
                                        <span class="sort-section">
                                            <i class="fa fa-caret-up sort-icon sort-icon-left" onClick={ () => this.sortDataAsc('marketCap')}></i> 
                                            <i class="fa fa-caret-down sort-icon sort-icon-right" onClick={ () => this.sortDataDesc('marketCap')}></i> 
                                        </span>
                                    </th>
                                    <th style={{ color: "#999"}}>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {  
                                !loading ? ( items.length > 0 ?
                                items.map((value) => {
                                    return (
                                        <tr onClick={ () => this.selectedSymbol(value.symbol)}>
                                            <td>
                                                { i = i + 1 }
                                            </td>
                                            <td> { value.name }</td>
                                            <td> $ { this.numberWithCommas(parseFloat(value.last).toFixed(2)) } </td>
                                            <td className={value.change > 0 ? 'green' : 'red'}> 
                                                { this.numberWithCommas(parseFloat(value.change).toFixed(2))}  %
                                            </td>
                                            <td> $ { this.numberWithCommas(parseFloat(value.marketCap).toFixed(2))  } </td>
                                            <td>  
                                                {
                                                    value.isDefaultPortfolio ? '' :  <i class="fa fa-remove" onClick={ () => this.handleDeleteCoin(value.id)}></i>
                                                }
                                                   
                                            </td>
                                        </tr>
                                    )
                                })
                                :  <tr> 
                                        <td colspan="7" class="text-center">
                                            No available data
                                        </td>
                                    </tr>
                                ) :     <tr> 
                                           <td colspan="7" class="text-center">
                                            <img src={loadingIcon} width="80px" />
                                        </td>
                                     </tr>
                            }
                        </tbody>
                    </Table>
                        </div>       
                    </div>
                    { items.length > 0 && 
                        <div className="col-sm-12 col-md-9 col-lg-9 coin-list-section-right" style={{ height: 500}}>
                            <ChartCoin symbol={symbol}/>
                        </div>
                    }
                </div>    
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
	return {
        searchCoinList: fetchCoinByNameSelector(state),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
        addCoinByPortfoliosIdAction: (payload) => { return dispatch(addCoinByPortfoliosId(payload)) },
        deleteCoinByPortfoliosIdAction: (payload) => { return dispatch(deleteCoinByPortfoliosId(payload)) },
        fetchCoinListByName: (id) => { return dispatch(fetchCoinByName(id)); },
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
