import { createSlice } from "@reduxjs/toolkit";

// Get cart items from localStorage (if available)
const storedItems = localStorage.getItem("cartItems");

const initialState = {
  cartItems: storedItems ? JSON.parse(storedItems) : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existItem = state.cartItems.find((item) => item.id === newItem.id);

      if (existItem) {
        existItem.quantity += newItem.quantity;
      } else {
        state.cartItems.push(newItem);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    deleteFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.cartItems.find((item) => item.id === id);

      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
  },
});

export const { addToCart, deleteFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
