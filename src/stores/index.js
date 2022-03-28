import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from './middleware/logger'
import bazaarItem from "./bazaarItem";

const rootReducer = combineReducers({
    bazaarItem
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export default store