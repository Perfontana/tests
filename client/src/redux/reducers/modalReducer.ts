const TOGGLE_MODAL = 'TOGGLE_MODAL';

interface ModalState {
  isOpen: boolean
  modalType: string
  id?: number
}

interface ModalAction {
  type: string
  payload: {
    status: boolean
    type: string
    id?: number
  }
}

const initialState = {
  isOpen: false,
  modalType: '',
  id: undefined,
};

export default function modalReducer(state = initialState, action: ModalAction): ModalState {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        isOpen: action.payload.status,
        modalType: action.payload.type,
        id: action.payload.id,
      };
    default: return state;
  }
}
