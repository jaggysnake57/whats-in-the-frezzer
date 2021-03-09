// react
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
//components
import Navbar from './Components/Navbar/Navbar';
//css
import './App.css';
import StorageEdit from './Pages/StorageEdit/StorageEdit';

function App() {
	const [items, setItems] = useState({});
	const dispatch = useDispatch();
	const { username, userDocId } = useSelector(selectUser);
	const { message, error } = useSelector(selectItems);

	const handleUser = () => {
		dispatch(getUser());
	};

	useEffect(() => {
		if (userDocId) {
			dispatch(getAllUsersItems(userDocId));
			dispatch(getAllUsersStorages(userDocId));
		}
	}, [userDocId]);

	return (
		<div className="App">
			<Router>
				<Navbar />
				<div className="message">
					{message}
					{error?.message}
				</div>
				<div className="container">
					{!username ? <Login /> : null}
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/items/new">
							<NewItem />
						</Route>
						<Route path="/items/:id">
							<ItemEdit />
						</Route>
						<Route exact path="/storages">
							<AllStorages />
						</Route>
						<Route exact path="/storages/new">
							<NewStorage />
						</Route>
						<Route exact path="/storages/:id">
							<StorageEdit />
						</Route>
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;
