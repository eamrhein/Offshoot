export const RECEIVE_CURRENT_MODAL = "RECEIVE_MODAL";
export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const CLOSE_MODALS = "CLOSE_MODALS";
export const HIDE_INFO_MODAL = "HIDE_INFO_MODAL";
export const SHOW_INFO_MODAL = 'SHOW_INFO_MODAL';

export const receiveCurrentModal = (modalName) => ({
    type: RECEIVE_CURRENT_MODAL,
    currentModal: modalName
});

export const toggleModal = (modalName) => ({
    type: TOGGLE_MODAL,
    modal: modalName
});

export const closeModals = () => ({
    type: CLOSE_MODALS
});
  
export const hideInfoModal = () => ({
    type: HIDE_INFO_MODAL
})

export const showInfoModal = () => ({
    type: SHOW_INFO_MODAL
})
