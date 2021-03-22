import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { externalSetMessage } from '../UI/UISlice';

export const storageSlice = createSlice({
	name: 'storage',
	initialState: {
		storages: [],
		message: '',
		error: {},
	},
	reducers: {
		setStorages: (state, action) => {
			state.storages = action.payload;
		},
		setMessage: (state, action) => {
			state.message = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
	},
});

export const { setStorages, setMessage, setError } = storageSlice.actions;

export const getAllUsersStorages = (id) => async (dispatch) => {
	try {
		const data = await db
			.collection('users')
			.doc(id)
			.collection('location')
			.get();
		if (data.empty) {
			dispatch(
				externalSetMessage({ type: 'error', content: 'User not found' })
			);
		} else {
			let tempStorage = [];
			data.docs.map((storage) => {
				tempStorage.push({
					...storage.data(),
					id: storage.id,
				});
			});
			dispatch(setStorages(tempStorage));
		}
	} catch (err) {
		dispatch(externalSetMessage({ type: 'error', content: err }));
	}
};

export const addNewStorage = (id, newStorage) => async (dispatch) => {
	try {
		const res = await db
			.collection('users')
			.doc(id)
			.collection('location')
			.add(newStorage);

		dispatch(getAllUsersStorages(id));
		dispatch(
			externalSetMessage({
				type: 'success',
				content: `New Storage, ${newStorage.name}, added`,
			})
		);
	} catch (err) {
		dispatch(externalSetMessage({ type: 'error', content: err }));
	}
};

export const editStorage = (userID, storageID, editedStorage) => async (
	dispatch
) => {
	try {
		console.log({ editedStorage });
		const res = await db
			.collection('users')
			.doc(userID)
			.collection('location')
			.doc(storageID)
			.set(editedStorage);
		dispatch(getAllUsersStorages);
		dispatch(
			externalSetMessage({
				type: 'success',
				content: `${editedStorage.name} has been edited`,
			})
		);
	} catch (err) {
		console.log(err);
		dispatch(externalSetMessage({ type: 'error', content: err }));
	}
};

export const deleteStorage = (userId, storageId) => async (dispatch) => {
	try {
		db.collection('users')
			.doc(userId)
			.collection('location')
			.doc(storageId)
			.delete();
		dispatch(
			externalSetMessage({ type: 'success', content: 'Item Removed' })
		);
		dispatch(getAllUsersStorages(userId));
	} catch (err) {
		console.log(err);
	}
};

export const selectStorages = (state) => state.storage;
export default storageSlice.reducer;
