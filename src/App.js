import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { db } from './firebase';
import firebase from 'firebase';
import Home from './Pages/Home/Home';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, selectUser } from './features/user/userSlice';
import { getAllUsersItems, selectItems } from './features/items/itemsSlice';
import Login from './Pages/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import NewItem from './Pages/NewItem/NewItem';
import ItemEdit from './Pages/ItemEdit/ItemEdit';
import AllStorages from './Pages/AllStorages/AllStorages';

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
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;
