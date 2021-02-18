import React from 'react';
import { useSelector } from 'react-redux';
import ListItem from '../../Components/ItemsList/ListItem';

import { selectItems } from '../../features/items/itemsSlice';
import { selectUser } from '../../features/user/userSlice';

const Home = () => {
	const { username, name, avatar, userDocId } = useSelector(selectUser);
	const { items } = useSelector(selectItems);
	return (
		<div>
			<h1>hello {username}</h1>
			<img src={avatar} alt="" />
			<h2>all your items</h2>
			<p>show `</p>
			{items.map((item) => (
				<div>
					<p>{item.name}</p>
					<p>
						{item.packSizeWGT == 0
							? item.packSizeAMT
							: `${item.packSizeWGT}gs`}
					</p>
					<p>
						in {item.storedInName}, in draw {item.draw}
					</p>
				</div>
			))}
		</div>
	);
};

export default Home;
