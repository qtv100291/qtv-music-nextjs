import { createSlice } from "@reduxjs/toolkit";
import additionalFunctionDom from "../utils/additionalFunctionDom";

const slice = createSlice({
  name: "loadingModal",
  initialState: {
    isOpening: false,
    quickViewId: null,
  },
  reducers: {
    openLoadingModal: (loadingModal) => {
      loadingModal.isOpening = true;
    },
    closeLoadingModal: (loadingModal) => {
      loadingModal.isOpening = false;
    },
  },
});

export const { openLoadingModal, closeLoadingModal } = slice.actions;

export const isRunningLoadingModal = (state) => state.loadingModal.isOpening;

export default slice.reducer;
