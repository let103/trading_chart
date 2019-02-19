import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table1 from '../../components/Table/Table';
import ChartCoin from '../../components/ChartCoin/ChartCoin';
import { fetchCoinByPortfoliosId } from '../../store/coin_detail/actionCreator';
import { fetchCoinByPortfoliosIdSelector } from '../../store/coin_detail/selectors';


class Home extends Component {
	constructor(props){
		super(props);
	  	this.state = { 
			  symbol: 'ETH'
		}
	}

	componentDidMount() {
		this.props.fetchCoinByPortfoliosById(5);
	}

	selectedSymbol = (selectedSymbol) => {
		this.setState({
			symbol: selectedSymbol
		});
	}

	render() {
		const { porfiliosCoinList } = this.props;
		const { symbol } = this.state;
		return (
			<div class="home">
				<div class="chart-section">
					<div class="table" style={{float: 'left', width: '35%'}}>
						<Table1 coins={porfiliosCoinList} selectedSymbol={this.selectedSymbol}/>
					</div>
					<div style={{float: 'left', width: '65%'}}>
						<ChartCoin symbol={symbol}/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		porfiliosCoinList: fetchCoinByPortfoliosIdSelector(state)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchCoinByPortfoliosById: (id) => { return dispatch(fetchCoinByPortfoliosId(id)); },
	};
};
  

export default connect(mapStateToProps, mapDispatchToProps)(Home);
