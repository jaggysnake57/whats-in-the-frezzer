import React from 'react';
import ItemForm from '../../Components/ItemForm/ItemForm';
import './index.css';

const NewItem = () => {
	return (
		<div className="newItem">
			<h1>Add a new Item</h1>
			<ItemForm editable={false} />
		</div>
	);
};

export default NewItem;
