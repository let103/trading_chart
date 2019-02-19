import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import MasterLayout from '../src/layout/master';
import configureStore from './store';
import createRoutes from './routes';
import AppRoute from './components/AppRoute/AppRoute';

class App extends Component {
  render() {
    const store = configureStore();
    return (
      <Provider store={store}>
          <Router>
            <MasterLayout>
              <AppRoute routes={createRoutes()} />
            </MasterLayout>  
          </Router>
      </Provider>
    );
  }
}

export default App;