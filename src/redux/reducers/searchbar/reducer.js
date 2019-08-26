import { ADD_SEARCH } from '../../constants/searchbar/actionTypes';

const initialState = {
  searches: [],
};

export default function reducer(state = initialState, action) {
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
