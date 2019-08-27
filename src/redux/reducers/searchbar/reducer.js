import { ADD_SEARCH, DELETE_SEARCH} from '../../constants/searchbar/actionTypes';

const initialState = {
  searches: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SEARCH: {
      return {
        ...state,
        searches: [...state.searches, action.payload],
      };
    }
    case DELETE_SEARCH: {
      const filteredSearches = state.searches.filter((search) => (search !== action.payload));
      return {
        ...state,
        searches: [filteredSearches],
      };
    }
    default:
      return state;
  }
};
