import React from 'react';
import { useSelector } from 'react-redux';
import ItemsList from '../../Components/ItemsList/ItemsList';

import { selectItems } from '../../features/items/itemsSlice';
import { selectUser } from '../../features/user/userSlice';

const Home = () => {
	const { username, name, avatar, userDocId } = useSelector(selectUser);
	const { items } = useSelector(selectItems);
	return (
		<div>
			<h1>all your items</h1>

			{items.length ? <ItemsList /> : <p>Loading</p>}
		</div>
	);
};

export default Home;
