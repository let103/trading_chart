import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap'

class TablePortfolios extends Component {
    static defaultProps = {
        coins: []
      }
    
      render() {
        const { coins } = this.props;

          return(
              <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <td> Name </td>
                        <td> Market </td>
                      </tr>
                </thead>
                <tbody>
                { 
                  coins.map((value) => {
                    return (
                      <tr>
                        <td>
                          <input type="checkbox" class="coin" />
                        </td>
                        <td> { value.name }</td>
                        <td>
                          <select>
                            <option value="1"> 123 </option>  
                            <option value="1"> 123 </option>  
                            <option value="1"> 123 </option>  
                            <option value="1"> 123 </option>  
                          </select>  
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
          </Table>
          )
      }
}

TablePortfolios.propTypes = {

};

export default TablePortfolios;