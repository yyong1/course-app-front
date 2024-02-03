// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
  authMode: 'signIn' | 'signUp';
}

const initialState: ModalState = {
  isOpen: false,
  authMode: 'signUp',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openAuthModal: (state, action: PayloadAction<'signIn' | 'signUp'>) => {
      state.isOpen = true;
      state.authMode = action.payload;
    },
    closeAuthModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openAuthModal, closeAuthModal } = modalSlice.actions;
export default modalSlice.reducer;
