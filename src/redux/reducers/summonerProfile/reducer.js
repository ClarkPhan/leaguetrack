import { CREATE_PROFILE, SHOW_MORE_MATCHES } from '../../constants/summonerProfile/actionTypes';

const initialState = null;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PROFILE:
      return { profile: action.payload, limit: 5 };
    case SHOW_MORE_MATCHES:
      return { ...state, limit: 10 };
    default:
      return state;
  }
}
