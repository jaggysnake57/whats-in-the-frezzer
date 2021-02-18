import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../firebase';

export const itemsSlice = createSlice({
	name: 'items',
	initialState: {
		items: [],
	},
	reducers: {
		setItems: (state, action) => {
			state.items = action.payload;
		},
	},
});

export const { setItems } = itemsSlice.actions;

export const getAllUsersItems = (id) => async (dispatch) => {
	console.log('get all users');
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
				tempItems.push(item.data());
			});
			dispatch(setItems(tempItems));
		}
	} catch (err) {
		console.log(err);
	}
};

export const selectItems = (state) => state.items;
export default itemsSlice.reducer;
