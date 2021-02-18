import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { db } from './firebase';
import firebase from 'firebase';
import Home from './Pages/Home/Home';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, selectUser } from './features/user/userSlice';
import { getAllUsersItems } from './features/items/itemsSlice';
import Login from './Pages/Login/Login';
import Navbar from './Components/Navbar/Navbar';

function App() {
	const [items, setItems] = useState({});
	const dispatch = useDispatch();
	const { username, name, avatar, userDocId } = useSelector(selectUser);

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
			<div className="container">
				<Router>
					<Login />
					<Navbar />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
					</Switch>
				</Router>
			</div>
		</div>
	);
}

export default App;
