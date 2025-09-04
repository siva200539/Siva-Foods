import { configureStore } from "@reduxjs/toolkit";
import CartSlice from './CartSlice.js'


export const store=configureStore(
    {
        reducer:{
            cart:CartSlice,
        }
    }
)
