import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { externalSetMessage } from '../UI/UISlice';

export const itemsSlice = createSlice({
	name: 'items',
	initialState: {
		items: [],
		filteredItems: [],
		filtered: false,
	},
	reducers: {
		setItems: (state, action) => {
			state.items = action.payload;
		},

		setFilteredItems: (state, action) => {
			state.filteredItems = action.payload;
		},
		setFiltered: (state, action) => {
			state.filtered = action.payload;
		},
		clearItems: (state) => {
			state.items = [];
			state.filteredItems = [];
			state.filtered = false;
		},
	},
});

export const {
	setItems,
	setFilteredItems,
	setFiltered,
	clearItems,
} = itemsSlice.actions;

export const getAllUsersItems = (id) => async (dispatch) => {
	try {
		const data = await db
			.collection('users')
			.doc(id)
			.collection('items')
			.get();
		if (data.empty) {
			dispatch(
				externalSetMessage({ type: 'error', content: 'User not found' })
			);
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
		externalSetMessage({ type: 'error', content: err });
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

		dispatch(getAllUsersItems(user));
		dispatch(
			externalSetMessage({
				type: 'success',
				content: `New item, ${newItem.name}, has been added`,
			})
		);
	} catch (err) {
		externalSetMessage({ type: 'error', content: err });
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

		dispatch(getAllUsersItems(user));
		dispatch(
			externalSetMessage({
				type: 'success',
				content: `${item.name} has been updated`,
			})
		);
	} catch (err) {
		console.log(err);
		dispatch(
			externalSetMessage({
				type: 'error',
				content: err,
			})
		);
	}
};

export const updateQuant = (userId, itemId, newQuant) => async (dispatch) => {
	try {
		const res = await db
			.collection('users')
			.doc(userId)
			.collection('items')
			.doc(itemId)
			.update({ quantity: newQuant });

		dispatch(getAllUsersItems(userId));
	} catch (err) {
		dispatch(
			externalSetMessage({
				type: 'error',
				content: err,
			})
		);
	}
};

export const deleteItem = (userId, itemId) => async (dispatch) => {
	try {
		db.collection('users')
			.doc(userId)
			.collection('items')
			.doc(itemId)
			.delete();
		dispatch(
			externalSetMessage({ type: 'success', content: 'Item Removed' })
		);
		dispatch(getAllUsersItems(userId));
	} catch (err) {
		console.log(err);
	}
};

export const selectItems = (state) => state.items;
export default itemsSlice.reducer;
