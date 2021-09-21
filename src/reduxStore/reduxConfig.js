import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import allReducers from "../combineReducer"
import coreSaga from "../sagaRoot/root"
const sagaMiddleware = createSagaMiddleware()
const store = createStore(allReducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(coreSaga)
//console.log("store")
export default store;


