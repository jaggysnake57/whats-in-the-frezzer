import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem } from '../../features/items/itemsSlice';
import { deleteStorage } from '../../features/storages/storageSlice';
import { selectUser } from '../../features/user/userSlice';

const Model = ({ setPopup, id, deleteType }) => {
	const { userDocId } = useSelector(selectUser);
	const dispatch = useDispatch();

	const handleDelete = () => {
		if (deleteType === 'item') {
			dispatch(deleteItem(userDocId, id));
		} else if (deleteType === 'storage') {
			dispatch(deleteStorage(userDocId, id));
		}
	};

	return (
		<div className="model">
			<div className="modelBox">
				<h2>Please Confirm</h2>
				<p>
					Confirm you wish to remove this item. This action can not be
					undone.
				</p>
				<div className="buttons">
					<button
						className="btn btnWarning"
						onClick={() => setPopup(false)}>
						Cancel
					</button>
					<button
						className="btn btnDanger"
						onClick={() => handleDelete()}>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default Model;
