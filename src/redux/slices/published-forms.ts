import PublishedFormInterface from "@/types/published-forms";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IPublishedFormState {
  allForms: PublishedFormInterface[];
}

const initialState: IPublishedFormState = {
  allForms: [],
};

export const publishedFormSlice = createSlice({
  name: "publishedForms",
  initialState,
  reducers: {
    publishNewForm: (state, action: PayloadAction<PublishedFormInterface>) => {
      state.allForms = [action.payload, ...state.allForms];
    },
    deleteForm: (state, action) => {
      const filterForms = state.allForms.filter(
        (_, id) => id !== action.payload
      );
      state.allForms = filterForms;
    },
  },
});

export const { publishNewForm, deleteForm } = publishedFormSlice.actions;

export default publishedFormSlice.reducer;
