import './App.css';
import { db } from './firebase';
import firebase from 'firebase';
import Home from './Pages/Home/Home';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, selectUser } from './features/user/userSlice';

function App() {
	const [items, setItems] = useState({});
	const dispatch = useDispatch();
	const { username, name, avatar } = useSelector(selectUser);

	const handleUser = () => {
		dispatch(getUser());
	};

	return (
		<div className="App">
			<button onClick={() => handleUser()}>login</button>
			<h1>
				hello {username} or {name.first} {name.last}
			</h1>
			<img src={avatar} alt="" />
			<Home />
		</div>
	);
}

export default App;
