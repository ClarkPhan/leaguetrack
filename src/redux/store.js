import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from 'redux';

// Redux persist
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Redux middleware
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';

// Component reducers
import searchbar from './reducers/searchbar/reducer';
import modal from './reducers/modal/reducer';
import summonerProfile from './reducers/summonerProfile/reducer';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig,
  combineReducers({
    searchbar,
    modal,
    summonerProfile,
  }));

// Redux: Store
const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(ReduxThunk, logger),

    // Redux Debug for Firefox Extension
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

// Middleware: Redux Persist Persister
const persistor = persistStore(store);

export {
  store,
  persistor,
};
