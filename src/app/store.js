import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../features/user/userSlice';
import itemsReducer from '../features/items/itemsSlice';
import storageReducer from '../features/storages/storageSlice';
import UIReducer from '../features/UI/UISlice';

export default configureStore({
	reducer: {
		user: userReducer,
		items: itemsReducer,
		storage: storageReducer,
		UI: UIReducer,
	},
});
