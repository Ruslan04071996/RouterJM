import { registration } from '../../constants/constants'

const { LOGIN_SUCCESS, LOGIN_WRONG, LOG_OUT } = registration
const initialState = {
	isLogin: false,
	user: {
		id: '',
		email: '',
		createdAt: '',
		username: '',
		bio: null,
		image: null,
		token: ' ',
	},
}

export default (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return { ...action.payload, isLogin: true }
		case LOGIN_WRONG:
			return initialState
		case LOG_OUT:
			return initialState
		default:
			return state
	}
}
