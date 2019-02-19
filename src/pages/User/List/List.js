import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';

class List extends Component {
    static defaultProps = {
        users: []
    };

    goToDetail = (id) => {
        window.location.href = `/user/${id}/portfolios`
    }

    render() {
        const { users } = this.props;
        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <td> Id </td>
                        <td> Email </td>
                        <td> Action </td>
                      </tr>
                </thead>
                <tbody>
                { users.length > 0 ?
                  users.map((value) => {
                    return (
                      <tr>
                        <td>
                            { value.id }
                        </td>
                        <td> { value.attributes.email }</td>
                        <td> 
                            <Button bsStyle="primary" onClick={ () => this.goToDetail(value.id)}>
                                Detail
                            </Button>
                        </td>
                      </tr>
                    )
                  })
                : <tr> <td colspan="3" className="text-center"> No available data </td> </tr>
                }
              </tbody>
          </Table>
        );
    }
}

List.propTypes = {

};

export default List;