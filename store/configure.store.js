import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import thunk from "redux-thunk";
import {applyMiddleware} from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./reducers/auth.reducers";


// const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage,
//     stateReconciler: autoMergeLevel2
// }

//const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
    reducer: {
        auth : authReducers
    }
});
//const persistor = persistStore(store);

export {store};