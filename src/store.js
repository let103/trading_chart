import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epics';
import reducers from './reducers';

const epicMiddleWare = createEpicMiddleware();
const configureStore = () => {
  const store = createStore(
    reducers,
    compose(
      applyMiddleware(epicMiddleWare),
      window.devToolsExtension ? window.devToolsExtension() : (f) => { return f; },
    ),
  );

  epicMiddleWare.run(rootEpic);

  return store;
};

export default configureStore;