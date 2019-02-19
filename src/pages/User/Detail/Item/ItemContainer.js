import React, { Component } from 'react';
import { connect } from 'react-redux';
import Item from '../Item/Item';
import { fetchCoinByPortfoliosId } from '../../../../store/coin_detail/actionCreator';
import { fetchCoinByPortfoliosIdSelector } from '../../../../store/coin_detail/selectors';

class ItemContainer extends Component {
    componentDidMount(){
        const { portFoliosId } = this.props;
        this.props.fetchCoinByPortfoliosById(portFoliosId);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.portFoliosId !== 0 && nextProps.portFoliosId !== this.props.portFoliosId){
            this.props.fetchCoinByPortfoliosById(nextProps.portFoliosId);
        }
    }

    render() {
        const { porfoliosCoinList, portFoliosId, fetchHistoryPortfolios90Days } = this.props;
    
        return (
            <Item 
                fetchHistoryPortfolios90Days={fetchHistoryPortfolios90Days}
                items={porfoliosCoinList} 
                portFoliosId={portFoliosId}
            />
        );
    }
}

ItemContainer.propTypes = {

};

const mapStateToProps = (state) => {
	return {
        porfoliosCoinList: fetchCoinByPortfoliosIdSelector(state)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
        fetchCoinByPortfoliosById: (id) => { return dispatch(fetchCoinByPortfoliosId(id)); }
	};
};
  

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer);
