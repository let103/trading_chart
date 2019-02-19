import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableCoinList from '../../components/TableCoinList/TableCoinList';
import { fetchTop30Coin } from '../../store/coin_detail/actionCreator';
import { fetchTop30CoinSelector } from '../../store/coin_detail/selectors';

class Coin extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchTop30CoinList();    
    }

    render() {
        const { coinList30 } = this.props;
        return (
            <TableCoinList coins={coinList30} />
        );
    }
}

Coin.propTypes = {

};

const mapStateToProps = (state) => {
	return {
		coinList30: fetchTop30CoinSelector(state)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchTop30CoinList: () => { return dispatch(fetchTop30Coin); },
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Coin);;