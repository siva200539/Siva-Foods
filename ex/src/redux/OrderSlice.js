// src/redux/OrderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orderedItems: [],
  },
  reducers: {
    addOrder: (state, action) => {
      state.orderedItems.push(action.payload);
    },
    clearOrders: (state) => {
      state.orderedItems = [];
    },
  },
});

export const { addOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
