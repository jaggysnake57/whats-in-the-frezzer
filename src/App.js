// react
import { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
	useHistory,
} from 'react-router-dom';
//redux
import { useDispatch, useSelector } from 'react-redux';
//slices
import { clearUser, getUser, selectUser } from './features/user/userSlice';
import {
	clearItems,
	getAllUsersItems,
	selectItems,
} from './features/items/itemsSlice';
import {
	clearStorage,
	getAllUsersStorages,
} from './features/storages/storageSlice';
//pages
import NewItem from './Pages/NewItem/NewItem';
import ItemEdit from './Pages/ItemEdit/ItemEdit';
import AllStorages from './Pages/AllStorages/AllStorages';
import NewStorage from './Pages/NewStorage/NewStorage';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import StorageEdit from './Pages/StorageEdit/StorageEdit';
//components
import Navbar from './Components/Navbar/Navbar';
import AllItems from './Pages/AllItems/AllItems';
//css
import './App.css';
import User from './Pages/User/User';
import UserEdit from './Pages/UserEdit/UserEdit';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import FlashMessage from './Components/FlashMessage/FlashMessage';
import { clearMessage, selectUI, setMessage } from './features/UI/UISlice';
import SignUp from './Pages/SignUp/SignUp';
import { auth } from './firebase';

function App() {
	const [items, setItems] = useState({});
	const dispatch = useDispatch();
	const { username, userDocId } = useSelector(selectUser);
	const { message } = useSelector(selectUI);
	let history = useHistory();

	// history.listen((location, action) => {
	// 	dispatch(clearMessage());
	// });

	const dirtySignout = () => {
		auth.signOut();
	};

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				dispatch(getUser(user.uid));
			} else {
				dispatch(clearUser());
				dispatch(clearItems());
				dispatch(clearStorage());
				dispatch(clearMessage());
			}
		});
	}, []);
	return (
		<div className="App">
			<Navbar />
			<button onClick={() => dirtySignout()}>signout</button>
			{message.type && <FlashMessage />}
			<div className="container">
				<Switch>
					<PrivateRoute exact path="/" component={Home} />

					<Route exact path="/login" component={Login} />
					<Route exact path="/signUp" component={SignUp} />

					<PrivateRoute exact path="/user" component={User} />

					<PrivateRoute
						exact
						path="/user/edit"
						component={UserEdit}
					/>

					<PrivateRoute exact path="/items" component={AllItems} />

					<PrivateRoute exact path="/items/new" component={NewItem} />

					<PrivateRoute path="/items/:id" component={ItemEdit} />

					<PrivateRoute
						exact
						path="/storages"
						component={AllStorages}
					/>

					<PrivateRoute
						exact
						path="/storages/new"
						component={NewStorage}
					/>

					<PrivateRoute
						exact
						path="/storages/:id"
						component={StorageEdit}
					/>
				</Switch>
			</div>
		</div>
	);
}

export default App;
