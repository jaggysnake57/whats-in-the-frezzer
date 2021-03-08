import React from 'react';
import ItemForm from '../../Components/ItemForm/ItemForm';
import './index.css';

const ItemEdit = () => {
	return (
		<div>
			<h1>Edit</h1>
			<ItemForm editable={true} />
		</div>
	);
};

export default ItemEdit;
