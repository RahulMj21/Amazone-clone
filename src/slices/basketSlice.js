import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQty: 0,
  totalPrice: 0,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      //check if item already exist in the cart

      const isInCart = state.items.find((item) =>
        item.id === action.payload.id ? true : false
      );

      if (isInCart) {
        let newItems = state.items.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : { ...item }
        );
        state.items = newItems;
      } else {
        state.items = [...state.items, action.payload];
      }
      state.totalQty = state.totalQty + 1;
      state.totalPrice = state.totalPrice + action.payload.price;
    },
    removeFromBasket: (state, action) => {
      const isItem = state.items.find((item) =>
        item.id === action.payload.id ? true : false
      );
      if (isItem) {
        const newItems = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        state.items = newItems;
        state.totalQty = state.totalQty - action.payload.qty;
        state.totalPrice =
          state.totalPrice - action.payload.price * action.payload.qty;
      }
    },
    clearBasket: (state) => {
      state.items = [];
      state.totalQty = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToBasket, removeFromBasket, clearBasket } =
  basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotalQty = (state) => state.basket.totalQty;
export const selectTotalPrice = (state) => state.basket.totalPrice;

export default basketSlice.reducer;
