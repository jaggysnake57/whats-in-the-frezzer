import { createSlice } from '@reduxjs/toolkit';
import { db, storageRef } from '../../firebase';
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

				// dispatch(
				// 	externalSetMessage({
				// 		type: 'general',
				// 		content: `welcome back ${user.data().username}`,
				// 	})
				// );
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
