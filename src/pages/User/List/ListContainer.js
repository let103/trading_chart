import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from './List';
import { fetchUserList } from '../../../store/user/actionCreator';
import { fetchUserListSelector } from '../../../store/user/selectors';

class ListContainer extends Component {
    componentDidMount(){
        this.props.fetchUserList();
    }

    render() {
        const { userList } = this.props;

        return (
            <List users={userList} />
        );
    }
}

ListContainer.propTypes = {

};


const mapStateToProps = (state) => {
	return {
		userList: fetchUserListSelector(state)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUserList: () => { return dispatch(fetchUserList); },
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);