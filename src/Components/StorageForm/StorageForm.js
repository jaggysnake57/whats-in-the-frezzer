//react
import React, { useEffect, useState } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
//slices
import {
	addNewStorage,
	editStorage,
} from '../../features/storages/storageSlice';
import { selectUser } from '../../features/user/userSlice';
//css
import './index.css';

const StorageForm = ({ editable, id, editableStorage }) => {
	//hooks
	const dispatch = useDispatch();
	const { userDocId } = useSelector(selectUser);
	//state
	const [nameValue, setNameValue] = useState('');
	const [shelfNumberValue, setShelfNumberValue] = useState('');
	const [shelfNamesValue, setShelfNamesValue] = useState({});
	const [shelfJSX, setShelfJSX] = useState('');
	//functions

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
					value={shelfNamesValue[i]}
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

	const prepStorageForDB = () => {
		if (nameValue && shelfNumberValue) {
			let tempStore = {
				name: nameValue,
				shelfNum: shelfNumberValue,
				shelves: [],
			};
			for (const [key, value] of Object.entries(shelfNamesValue)) {
				tempStore.shelves.push(value);
			}
			return tempStore;
		} else {
			alert('please check the form ');
			return false;
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newStorageData = prepStorageForDB();
		if (newStorageData) {
			if (editable) {
				dispatch(editStorage(userDocId, id, newStorageData));
			} else {
				dispatch(addNewStorage(userDocId, newStorageData));
			}
		} else {
			console.log(false);
		}
	};
	// useEffects

	//shelf jsx effect
	useEffect(() => {
		setShelfJSX(showShelfNameForm());
	}, [shelfNumberValue]);

	// populate fields if the form is editable
	useEffect(() => {
		if (editable) {
			const { name, shelfNum, shelves } = editableStorage;
			setNameValue(name);
			setShelfNumberValue(shelfNum);
			shelves?.map((shelfName, i) => {
				setShelfNamesValue((prevValues) => {
					return {
						...prevValues,
						[i + 1]: shelfName,
					};
				});
			});
		}
	}, [editableStorage]);

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
					{shelfJSX.length ? <h3>Shelf Names</h3> : ''}
					{shelfJSX}
					<button className="btn btnPrimary">Submit</button>
				</form>
			</div>
		</div>
	);
};

export default StorageForm;
