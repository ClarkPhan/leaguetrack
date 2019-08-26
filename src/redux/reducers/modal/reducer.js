import DISPLAY_MODAL from '../../constants/modal/actionTypes';

const initialState = {
  displayModal: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_MODAL: {
      return {
        ...state,
        displayModal: action.payload,
      };
    }
    default:
      return state;
  }
}
