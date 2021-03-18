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
import FlashMessage from './Components/FlashMessage/FlashMessage';
import { clearMessage, selectUI, setMessage } from './features/UI/UISlice';

function App() {
	const [items, setItems] = useState({});
	const dispatch = useDispatch();
	const { username, userDocId } = useSelector(selectUser);
	const { message } = useSelector(selectUI);
	const history = useHistory();

	history.listen((location, action) => {
		dispatch(clearMessage());
	});

	const handleTestFlash = (type) => {
		switch (type) {
			case 'error':
				dispatch(
					setMessage({
						type: 'error',
						content: 'this is a test error message',
					})
				);
				break;
			case 'success':
				dispatch(
					setMessage({
						type: 'success',
						content: 'this is a test success message',
					})
				);
				break;
			case 'general':
				dispatch(
					setMessage({
						type: 'general',
						content: 'this is a test general message',
					})
				);
				break;

			default:
				dispatch(
					setMessage({
						type: 'error',
						content: 'something actualy went wrong',
					})
				);
				break;
		}
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
			{message.type && <FlashMessage />}
			<div className="container">
				<div style={{ marginTop: '5rem' }}>
					<button onClick={() => handleTestFlash('error')}>
						warn
					</button>
					<button onClick={() => handleTestFlash('success')}>
						success
					</button>
					<button onClick={() => handleTestFlash('general')}>
						general
					</button>
				</div>
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
