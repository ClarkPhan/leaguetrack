import DISPLAY_MODAL from '../../constants/modal/actionTypes';

export default function showModal(payload) {
  return ({ type: DISPLAY_MODAL, payload });
}
