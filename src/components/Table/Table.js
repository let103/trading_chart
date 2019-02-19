import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap'

class Table1 extends Component {
  static defaultProps = {
    coins: [],
    selectedSymbol: function(){}
  }

  getSymbol = (symbol) => {
    this.props.selectedSymbol(symbol);
  }

  render() {
    const { coins } = this.props;
      return(
          <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <td> Rank </td>
                    <td> Portfolio </td>
                    <td>Last </td>
                    <td>Change </td>
                  </tr>
            </thead>
            <tbody>
            { 
              coins.map((value) => {
                return (
                  <tr onClick={ () => { this.getSymbol(value.symbol)} }>
                    <td>1</td>
                    <td> { value.symbol }</td>
                  </tr>
                )
              })
            }
          </tbody>
      </Table>
      )
  }
}

export default Table1;