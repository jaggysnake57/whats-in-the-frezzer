import { createSlice } from '@reduxjs/toolkit';

import { auth, db, storageRef } from '../../firebase';
import { getAllUsersItems } from '../items/itemsSlice';
import { getAllUsersStorages } from '../storages/storageSlice';
import { externalSetMessage } from '../UI/UISlice';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		UUID: '',
		userDocId: '',
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
			} = action.payload.userData;
			state.UUID = UUID;
			state.username = username;
			state.name.first = firstName;
			state.name.last = lastName;
			state.avatar = avatar;
			state.userDocId = action.payload.userId;
			state.email = email;
		},
		clearUser: (state) => {
			state.UUID = '';
			state.username = '';
			state.name.first = '';
			state.name.last = '';
			state.avatar = '';
			state.userDocId = '';
			state.email = '';
		},
	},
});

export const { setUser, clearUser } = userSlice.actions;

export const createNewUser = (userData) => async (dispatch) => {
	try {
		const newUser = await auth.createUserWithEmailAndPassword(
			userData.email,
			userData.password
		);
	} catch (err) {
		console.log(err);
		dispatch(externalSetMessage({ type: 'error', content: err.message }));
	}
};

export const loginUser = (email, password) => async (dispatch) => {
	try {
		const user = await auth.signInWithEmailAndPassword(email, password);
	} catch (err) {
		console.log(err);
	}
};

export const getUser = (UUID) => async (dispatch) => {
	try {
		const data = await db
			.collection('users')
			.where('UUID', '==', UUID)
			.get();
		if (data.empty) {
			dispatch(
				externalSetMessage({
					type: 'error',
					content:
						'There has been and internal error. CODE: no user found',
				})
			);
		} else {
			data.docs.map((user) => {
				dispatch(
					setUser({
						userId: user.id,
						userData: user.data(),
					})
				);

				dispatch(getAllUsersItems(user.id));
				dispatch(getAllUsersStorages(user.id));
			});
		}

		// dispatch(setUser());
	} catch (err) {
		dispatch(externalSetMessage({ type: 'error', content: err }));
	}
};

export const editUserData = (userId, userData, file) => async (dispatch) => {
	try {
		await db.collection('users').doc(userId).update(userData);
		if (file) {
			const fileRef = storageRef.child(file.name);
			await fileRef.put(file);
			const fileUrl = await fileRef.getDownloadURL();
			await db
				.collection('users')
				.doc(userId)
				.update({ avatar: fileUrl });
		}
		dispatch(getUser());
		dispatch(
			externalSetMessage({
				type: 'success',
				content: 'User Profile updated',
			})
		);
	} catch (err) {
		console.log(err);
		dispatch(externalSetMessage({ type: 'error', content: err }));
	}
};

export const selectUser = (state) => state.user;
export default userSlice.reducer;
