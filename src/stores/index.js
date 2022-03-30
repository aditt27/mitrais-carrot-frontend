import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from './middleware/logger'
import bazaarItemReducer from "./bazaarItem";
import authReducer from './auth';
import userReducer from './user'

const rootReducer = combineReducers({
    bazaarItemReducer,
    authReducer,
    userReducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export default store