import { createSlice } from '@reduxjs/toolkit';
import additionalFunctionDom from '../utils/additionalFunctionDom';

const slice = createSlice({
    name : "quickViewModal",
    initialState: {
        isOpening : false,
        quickViewId:null
    },
    reducers : {
        openQuickViewModal : (quickViewModal, action) => {
            quickViewModal.isOpening = true
            quickViewModal.quickViewId = action.payload.id
        },
        closeQuickViewModal : quickViewModal => {
            quickViewModal.isOpening = false
        }
    }
})

export const { openQuickViewModal, closeQuickViewModal } = slice.actions;

export const isOpeningModal = state => state.quickViewModal.isOpening

export default slice.reducer;