import { createStore,applyMiddleware,combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import user from './user'

const counterReducer = (state = 0, action) => {
	switch (action.type) {
		case 'add':
			return state + 1
		case 'minus':
			return state - 1
		default:
			return state
	}
}

const store = createStore(
	combineReducers({counterReducer,user}),
	applyMiddleware(logger,thunk)
	)

export default store
