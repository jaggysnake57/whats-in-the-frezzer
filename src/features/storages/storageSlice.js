import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../firebase';

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
			console.log('nothing found');
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
		console.log(err);
	}
};

export const addNewStorage = (id, newStorage) => async (dispatch) => {
	try {
		const res = await db
			.collection('users')
			.doc(id)
			.collection('location')
			.add(newStorage);
		dispatch(setMessage('new storage added'));
		dispatch(getAllUsersStorages(id));
	} catch (err) {
		console.log(err);
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

		console.log(editedStorage.name, 'has been edited');
	} catch (err) {
		console.log(err);
	}
};

export const selectStorages = (state) => state.storage;
export default storageSlice.reducer;
