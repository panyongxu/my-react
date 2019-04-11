const USER = {
	isLogin: false,
	isLoading: false
}

const user = (state = USER, action) => {
	switch (action.type) {
		case 'loading':
			return {
				isLogin: false,
				isLoading: true
			}
		case 'login':
			return  {
				isLogin: true,
				isLoading: false
			}
		default:
			return state
	}
}

export default user
