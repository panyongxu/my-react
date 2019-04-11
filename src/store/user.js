const USER = {
  isLogin: false,
  islOading: false
}

const counterReducer = (state = USER, action) => {
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
	counterReducer,
	applyMiddleware(logger,thunk)
	)

export default store
