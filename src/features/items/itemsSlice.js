import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../firebase';

export const itemsSlice = createSlice({
	name: 'items',
	initialState: {
		items: [],
		message: '',
		error: {},
		filteredItems: [],
		filtered: false,
	},
	reducers: {
		setItems: (state, action) => {
			state.items = action.payload;
		},
		setMessage: (state, action) => {
			state.message = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
		setFilteredItems: (state, action) => {
			state.filteredItems = action.payload;
		},
		setFiltered: (state, action) => {
			state.filtered = action.payload;
		},
	},
});

export const {
	setItems,
	setMessage,
	setError,
	setFilteredItems,
	setFiltered,
} = itemsSlice.actions;

export const getAllUsersItems = (id) => async (dispatch) => {
	try {
		const data = await db
			.collection('users')
			.doc(id)
			.collection('items')
			.get();
		if (data.empty) {
			console.log('nothing found');
		} else {
			let tempItems = [];
			data.docs.map((item) => {
				tempItems.push({
					...item.data(),
					id: item.id,
				});
			});
			dispatch(setItems(tempItems));
		}
	} catch (err) {
		console.log(err);
	}
};

export const addNewItem = (user, newItem) => async (dispatch) => {
	try {
		if (!user) {
			throw { code: 501, message: 'no user provided, please log in' };
		}
		const res = await db
			.collection('users')
			.doc(user)
			.collection('items')
			.add(newItem);
		dispatch(setMessage('New Item Added'));
		dispatch(getAllUsersItems(user));
	} catch (err) {
		console.log(err);
		dispatch(setError(err));
	}
};

export const updateItem = (user, itemId, item) => async (dispatch) => {
	try {
		const res = await db
			.collection('users')
			.doc(user)
			.collection('items')
			.doc(itemId)
			.set(item);
		dispatch(setMessage(`The item ${item.name} has been updated`));
		dispatch(getAllUsersItems(user));
	} catch (err) {
		dispatch(setError(err));
	}
};

// export const filterItems = (filters) => async (dispatch) => {

// 	const filteredItems = state.items.filter((item) => {
// 		if (filters.search && items.name.search(filters.search)) {
// 			console.log('search found');
// 		}
// 	});
// };

export const selectItems = (state) => state.items;
export default itemsSlice.reducer;
