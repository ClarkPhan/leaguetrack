import { CREATE_PROFILE } from '../../constants/summonerProfile/actionTypes';

const initialState = null;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PROFILE: {
      return action.payload;
    }
    default:
      return state;
  }
}
