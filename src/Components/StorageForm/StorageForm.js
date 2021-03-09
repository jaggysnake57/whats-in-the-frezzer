import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewStorage } from '../../features/storages/storageSlice';
import { selectUser } from '../../features/user/userSlice';
import './index.css';

const StorageForm = () => {
	const dispatch = useDispatch();
	const { userDocId } = useSelector(selectUser);

	const [nameValue, setNameValue] = useState('');
	const [shelfNumberValue, setShelfNumberValue] = useState('');
	const [shelfNamesValue, setShelfNamesValue] = useState({});
	const [shelfJSX, setShelfJSX] = useState('');

	const showShelfNameForm = () => {
		let shelfNameJSX = [];
		let shelfNamesTempState = {};
		for (let i = 1; i <= shelfNumberValue && i <= 50; i++) {
			shelfNameJSX.push(
				<input
					key={i}
					type="text"
					placeholder={`shelf number ${i} name`}
					onChange={(e) => handleShelfNameChange(e, i)}
				/>
			);
			shelfNamesTempState = {
				...shelfNamesTempState,
				[i]: '',
			};
		}
		setShelfNamesValue(shelfNamesTempState);
		return shelfNameJSX;
	};

	const handleShelfNameChange = (event, index) => {
		setShelfNamesValue((prevValues) => {
			return {
				...prevValues,
				[index]: event.target.value,
			};
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (nameValue && shelfNumberValue) {
			let newStorage = {
				name: nameValue,
				shelfNum: shelfNumberValue,
				shelves: [],
			};
			for (const [key, value] of Object.entries(shelfNamesValue)) {
				newStorage.shelves.push(value);
			}
			dispatch(addNewStorage(userDocId, newStorage));
		}
	};

	useEffect(() => {
		setShelfJSX(showShelfNameForm());
	}, [shelfNumberValue]);

	return (
		<div className="storageForm">
			<div className="storageFormContainer">
				<form onSubmit={(e) => handleSubmit(e)}>
					<input
						type="text"
						value={nameValue}
						onChange={(e) => setNameValue(e.target.value)}
						placeholder="enter name"
					/>
					<input
						type="number"
						value={shelfNumberValue}
						max="50"
						onChange={(e) => setShelfNumberValue(e.target.value)}
						placeholder="enter number of shelves"
					/>
					<h3>Shelf Names</h3>
					{shelfJSX}
					<button className="btn btnPrimary">Submit</button>
				</form>
			</div>
		</div>
	);
};

export default StorageForm;
