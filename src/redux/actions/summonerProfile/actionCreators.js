import { CREATE_PROFILE, SHOW_MORE_MATCHES } from '../../constants/summonerProfile/actionTypes';

export const createProfile = (payload) => ({ type: CREATE_PROFILE, payload });
export const showMoreMatches = () => ({ type: SHOW_MORE_MATCHES });
// export const deleteProfile = (payload) => ({ type: DELETE_PROFILE, payload });
