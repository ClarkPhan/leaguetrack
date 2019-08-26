import { ADD_SEARCH } from '../constants/actionTypes';

const initialState = {
  searches: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SEARCH: {
      return {
        ...state,
        searches: [action.payload],
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
