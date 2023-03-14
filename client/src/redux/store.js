import { configureStore } from "@reduxjs/toolkit";
import authReducer, { loadUser } from "./authSlice";
import cartReducer, { getTotals } from "./cartSlice";
import productsReducer, { productsFetch } from "./productsSlice";
import savedItemsReducer from "./savedItems";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    savedItems: savedItemsReducer,
  },
});

store.dispatch(loadUser());
store.dispatch(productsFetch());
store.dispatch(getTotals());
