import React from 'react';
import ItemsList from '../../Components/ItemsList/ItemsList';
import './index.css';

const AllItems = () => {
	return (
		<div className="allItems">
			<h1>All Your Items</h1>
			<ItemsList />
		</div>
	);
};

export default AllItems;
