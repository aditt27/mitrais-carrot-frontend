import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from './middleware/logger'
import bazaarItemReducer from "./bazaarItem";

const rootReducer = combineReducers({
    bazaarItemReducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export default store