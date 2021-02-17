import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../firebase';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		UUID: '',
		username: '',
		name: {
			first: '',
			last: '',
		},
		avatar: '',
		email: '',
	},
	reducers: {
		setUser: (state, action) => {
			const {
				UUID,
				username,
				email,
				firstName,
				lastName,
				avatar,
			} = action.payload;
			state.UUID = UUID;
			state.username = username;
			state.name.first = firstName;
			state.name.last = lastName;
			state.avatar = avatar;
		},
	},
});

export const { setUser } = userSlice.actions;

export const getUser = () => async (dispatch) => {
	try {
		const UUID = 'u0tHuGAnx8b2JDshY5Kb37FwsMA2';
		const data = await db
			.collection('users')
			.where('UUID', '==', UUID)
			.get();
		if (data.empty) {
			console.log('nothing found');
		} else {
			data.docs.map((user) => {
				dispatch(setUser(user.data()));
			});
		}

		// dispatch(setUser());
	} catch (err) {
		console.log(err);
	}
};

export const selectUser = (state) => state.user;
export default userSlice.reducer;
