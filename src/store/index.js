import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import user from './user'
import test from './test'

const store = createStore(combineReducers({ test, user }), applyMiddleware(logger, thunk))

export default store
