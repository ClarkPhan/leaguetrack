import { createStore, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers/index';


const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(ReduxThunk, logger),
  ),
);

export default store;
