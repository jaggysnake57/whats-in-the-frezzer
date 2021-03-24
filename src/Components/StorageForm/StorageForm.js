//react
import React, { useEffect, useState } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
//slices
import {
	addNewStorage,
	editStorage,
} from '../../features/storages/storageSlice';
import { selectUI } from '../../features/UI/UISlice';
import { selectUser } from '../../features/user/userSlice';
import Model from '../Model/Model';
//css
import './index.css';

const StorageForm = ({ editable, id, editableStorage }) => {
	//hooks
	const dispatch = useDispatch();
	const { userDocId } = useSelector(selectUser);
	const { message } = useSelector(selectUI);
	const history = useHistory();
	//state
	const [nameValue, setNameValue] = useState('');
	const [shelfNumberValue, setShelfNumberValue] = useState('');
	const [shelfNamesValue, setShelfNamesValue] = useState({});
	const [shelfJSX, setShelfJSX] = useState('');
	const [popup, setPopup] = useState(false);
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

	const populateEditableFields = () => {
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
	};

	const handleReset = (event) => {
		event.preventDefault();
		if (editable) {
			//do code
			populateEditableFields();
		} else {
			setShelfNumberValue('');
			setNameValue('');
		}
	};
	// useEffects

	//shelf jsx effect
	useEffect(() => {
		setShelfJSX(showShelfNameForm());
	}, [shelfNumberValue]);

	useEffect(() => {
		if (editable) {
			populateEditableFields();
		}
	}, [editableStorage]);

	useEffect(() => {
		if (message.type === 'success' && message.content === 'Item Removed') {
			history.push('/storages');
		}
	}, [message]);

	return (
		<div className="storageForm">
			{popup && (
				<Model setPopup={setPopup} id={id} deleteType={'storage'} />
			)}
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
					<div className="buttons">
						{editable && (
							<button
								className="btn btnDanger"
								type="button"
								onClick={() => setPopup(true)}>
								Delete
							</button>
						)}
						<button
							onClick={(e) => handleReset(e)}
							className="btn btnWarning">
							Reset
						</button>
						<button className="btn btnPrimary">Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default StorageForm;
