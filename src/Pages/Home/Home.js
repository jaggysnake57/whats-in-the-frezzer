//react
import React from 'react';
//redux
import { useSelector } from 'react-redux';
//slices
import { selectItems } from '../../features/items/itemsSlice';
import { selectUser } from '../../features/user/userSlice';
//components
import ItemsList from '../../Components/ItemsList/ItemsList';
//css
import './index.css';

const Home = () => {
	const { username, name, avatar, userDocId } = useSelector(selectUser);
	const { items } = useSelector(selectItems);
	return (
		<div className="home">
			<h1>All Your Items</h1>

			{items.length ? <ItemsList /> : <p>Loading</p>}
		</div>
	);
};

export default Home;
