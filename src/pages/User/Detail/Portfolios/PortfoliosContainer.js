import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Portfilios from './Portfolios';
import { fetchTop30Coin } from '../../../../store/coin_detail/actionCreator';
import { fetchTop30CoinSelector } from '../../../../store/coin_detail/selectors';
import { fetchPortfoliosList, addPortfolio, fetchHistoryPortfoliosList90Days } from '../../../../store/portfolio/actionCreator';
import { fetchPortfoliosListSelector, fetchHistoryPortfolios90DaysListSelector } from '../../../../store/portfolio/selectors';

class PortfiliosContainer extends Component {	
	componentDidMount(){
		const { match: { url } } = this.props;
		this.props.fetchPortfoliosListById(url.split('/')[2]);
		this.props.fetchTop30CoinAcion();
	}

	addNewPortfolio = (body) => {
		this.props.addPorfolioAction(body);
	}

	fetchHistoryPortfolios90Days = (payload) => {
		this.props.fetchHistoryPortfoliosList90DaysAction(payload);
	}

    render() {
		const { portfoliosList, match: { url }, portfolios90Days, top30CoinList } = this.props;
	
        return (
			<Portfilios 
				top30CoinList={top30CoinList}
				portfolios={portfoliosList} 
				currentUrl={url} 
				addNewPortfolio={this.addNewPortfolio}
				portfolios90Days={portfolios90Days}
				fetchHistoryPortfolios90Days={this.fetchHistoryPortfolios90Days}
			/>
        );
    }
}

PortfiliosContainer.propTypes = {

};

const mapStateToProps = (state) => {
	return {
		top30CoinList: fetchTop30CoinSelector(state),
		portfolios90Days: fetchHistoryPortfolios90DaysListSelector(state),
		portfoliosList: fetchPortfoliosListSelector(state)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchPortfoliosListById: (id) => { return dispatch(fetchPortfoliosList(id)); },
		addPorfolioAction: (body) => { return dispatch(addPortfolio(body)); },
		fetchHistoryPortfoliosList90DaysAction: (payload) => { return dispatch(fetchHistoryPortfoliosList90Days(payload)); },
		fetchTop30CoinAcion: () => { return dispatch(fetchTop30Coin); }
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfiliosContainer);
