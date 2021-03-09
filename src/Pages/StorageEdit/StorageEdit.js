import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import StorageForm from '../../Components/StorageForm/StorageForm';
import { selectStorages } from '../../features/storages/storageSlice';

const StorageEdit = () => {
	const { id } = useParams();
	const { storages } = useSelector(selectStorages);
	const [editableStorage, setEditableStorage] = useState({});

	useEffect(() => {
		storages.map((store) => {
			if (store.id === id) {
				setEditableStorage(store);
			}
		});
	}, []);

	return (
		<div className="storageEdit">
			<h1>Edit</h1>
			<StorageForm
				editable={true}
				id={id}
				editableStorage={editableStorage}
			/>
		</div>
	);
};

export default StorageEdit;
