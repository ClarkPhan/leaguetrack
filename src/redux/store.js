import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from 'redux';

// Redux middleware
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';

// Component reducers
import searchbar from './reducers/searchbar/reducer';
import modal from './reducers/modal/reducer';

const store = createStore(
  combineReducers({
    searchbar,
    modal,
  }),
  compose(
    applyMiddleware(ReduxThunk, logger),
  ),
);

export default store;
