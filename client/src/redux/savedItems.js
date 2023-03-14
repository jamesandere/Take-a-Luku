import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: localStorage.getItem("savedItems")
    ? JSON.parse(localStorage.getItem("savedItems"))
    : [],
};

const savedItemsSlice = createSlice({
  name: "savedItems",
  initialState,
  reducers: {
    addToSavedList(state, action) {
      const itemIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
      } else {
        state.items.push({ ...action.payload, isSaved: true });
        localStorage.setItem("savedItems", JSON.stringify(state.items));
      }
    },
    deleteFromSavedList(state, action) {
      const newItems = state.items.filter(
        (item) => item._id !== action.payload._id
      );
      state.items = newItems;
      localStorage.setItem("savedItems", JSON.stringify(state.items));
    },
  },
  extraReducers: {},
});

export const { addToSavedList, deleteFromSavedList } = savedItemsSlice.actions;
export default savedItemsSlice.reducer;
