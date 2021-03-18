import { createSlice } from '@reduxjs/toolkit';

export const UISlice = createSlice({
	name: 'UI',
	initialState: {
		message: {
			type: '',
			content: '',
		},

		loading: false,
	},
	reducers: {
		setMessage: (state, action) => {
			state.message = action.payload;
		},
		clearMessage: (state) => {
			state.message = { type: '', content: '' };
		},
		setLoading: (state) => {
			state.loading = true;
		},
		unsetLoading: (state) => {
			state.loading = false;
		},
	},
});

export const {
	setMessage,
	clearMessage,
	setLoading,
	unsetLoading,
} = UISlice.actions;

export const externalSetMessage = (message) => {
	return setMessage(message);
};

export const selectUI = (state) => state.UI;
export default UISlice.reducer;
