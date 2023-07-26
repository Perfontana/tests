import { TOGGLE_MODAL } from '../../utils/constants';

interface PayloadModal {
  type?: string
  status: boolean
  id?: number
}

interface ActionModal {
  type: string
  payload: PayloadModal
}

const toggleModal = (payload: PayloadModal): ActionModal => ({
  type: TOGGLE_MODAL,
  payload,
});

export default toggleModal;
