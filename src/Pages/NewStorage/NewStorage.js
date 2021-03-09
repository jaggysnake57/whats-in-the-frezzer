import React from 'react';
import StorageForm from '../../Components/StorageForm/StorageForm';
import './index.css';

const NewStorage = () => {
	return (
		<div className="newStorage">
			<h1>Add a new storage</h1>
			<StorageForm />
		</div>
	);
};

export default NewStorage;
