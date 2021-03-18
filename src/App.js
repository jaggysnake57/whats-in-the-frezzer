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
import { getUser, selectUser } from './features/user/userSlice';
import { getAllUsersItems, selectItems } from './features/items/itemsSlice';
import { getAllUsersStorages } from './features/storages/storageSlice';
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

function App() {
	const [items, setItems] = useState({});
	const dispatch = useDispatch();
	const { username, userDocId } = useSelector(selectUser);
	const { message, error } = useSelector(selectItems);
	const history = useHistory();

	const handleUser = () => {
		dispatch(getUser());
	};

	useEffect(() => {
		if (userDocId) {
			dispatch(getAllUsersItems(userDocId));
			dispatch(getAllUsersStorages(userDocId));
			history.push('/');
		}
	}, [userDocId]);

	return (
		<div className="App">
			<Navbar />
			<div className="message">
				{message}
				{error?.message}
			</div>
			<div className="container">
				{!username ? <Redirect to="/login" /> : null}
				<Switch>
					<PrivateRoute exact path="/" component={Home} />

					<Route exact path="/login" component={Login} />

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
