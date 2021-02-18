import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice';
import itemsReducer from '../features/items/itemsSlice';

export default configureStore({
	reducer: {
		counter: counterReducer,
		user: userReducer,
		items: itemsReducer,
	},
});
