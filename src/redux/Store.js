import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slicer";

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;
