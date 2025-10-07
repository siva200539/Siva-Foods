import { configureStore } from "@reduxjs/toolkit";
import CartSlice from './CartSlice.js'
import orderReducer from "./OrderSlice";

export const store=configureStore(
    {
        reducer:{
            cart:CartSlice,
            orders: orderReducer,
        }
    }
)
