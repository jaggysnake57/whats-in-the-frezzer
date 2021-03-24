//react
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//redux
import {
	addNewItem,
	deleteItem,
	getAllUsersItems,
	selectItems,
	updateItem,
} from '../../features/items/itemsSlice';
import { selectUser } from '../../features/user/userSlice';
import { selectStorages } from '../../features/storages/storageSlice';
//icons
import { BiDownArrow } from 'react-icons/bi';
import { useHistory, useParams } from 'react-router-dom';
//stylesheets
import './index.css';
import { selectUI } from '../../features/UI/UISlice';
import Model from '../Model/Model';

const ItemForm = ({ editable }) => {
	//hooks
	const dispatch = useDispatch();
	const { id } = useParams();
	const history = useHistory();
	// slices
	const { userDocId } = useSelector(selectUser);
	const { items } = useSelector(selectItems);
	const { storages } = useSelector(selectStorages);
	const { message } = useSelector(selectUI);
	//state
	const [nameValue, setNameValue] = useState('');
	const [packSizeValue, setPackSizeValue] = useState('');
	const [quantityValue, setQuantityValue] = useState('');
	const [storedInValue, setStoredInValue] = useState('');
	const [drawValue, setDrawValue] = useState('');
	const [checkboxValue, setCheckboxValue] = useState(false);
	const [formError, setFormError] = useState('');
	const [currentShelves, setCurrentShelves] = useState([]);
	const [popup, setPopup] = useState(false);
	//functions
	const handleSubmit = (e) => {
		e.preventDefault();
		if (nameValue && packSizeValue) {
			if (!quantityValue) {
				setQuantityValue('0');
			}
			let newItem = {
				name: nameValue,
				quantity: parseInt(quantityValue),
				storedInName: storedInValue,
				draw: drawValue,
				packSizeAMT: 0,
				packSizeWGT: 0,
			};
			checkboxValue
				? (newItem.packSizeWGT = parseInt(packSizeValue))
				: (newItem.packSizeAMT = parseInt(packSizeValue));
			editable
				? dispatch(updateItem(userDocId, id, newItem))
				: dispatch(addNewItem(userDocId, newItem));

			// dispatch(getAllUsersItems(userDocId));
		} else {
			if (!nameValue) {
				setFormError('name');
			} else if (!packSizeValue) {
				setFormError('pack');
			}
			console.log('a field is missing');
		}
	};

	const populateEditableFields = () => {
		items.map((item) => {
			if (id === item.id) {
				setNameValue(item.name);
				if (item.packSizeAMT) {
					setPackSizeValue(item.packSizeAMT);
				} else {
					setPackSizeValue(item.packSizeWGT);
					setCheckboxValue(true);
				}
				setQuantityValue(item.quantity);
				setStoredInValue(item.storedInName);
				setDrawValue(item.draw);
			}
		});
	};

	const handleReset = (event) => {
		event.preventDefault();
		console.log('clicked');

		if (editable) {
			populateEditableFields();
			console.log('editable');
		} else {
			setNameValue('');
			setPackSizeValue('');
			setQuantityValue('');
			setPackSizeValue('');
			setCheckboxValue(false);
			console.log('not editable');
		}
	};

	// use effects
	useEffect(() => {
		if (editable) {
			populateEditableFields();
		}
	}, []);

	useEffect(() => {
		//if there is a stored in value
		if (storedInValue) {
			storages.map((storage) => {
				if (storedInValue === storage.name) {
					setCurrentShelves(storage.shelves);
					return;
				}
			});
		}
		//if so find storage and get shelves add to state
	}, [storedInValue]);

	useEffect(() => {
		if (message.type === 'success' && message.content === 'Item Removed') {
			history.push('/items');
		}
	}, [message]);

	return (
		<div className="itemForm">
			{popup && <Model setPopup={setPopup} id={id} deleteType={'item'} />}
			{editable && !nameValue ? (
				<h2>nothing found</h2>
			) : (
				<div className="formContainer">
					<form action="" onSubmit={(e) => handleSubmit(e)}>
						<input
							type="text"
							placeholder="Item Name"
							value={nameValue}
							onChange={(e) => setNameValue(e.target.value)}
							className={
								formError === 'name' ? 'formError' : null
							}
						/>
						<div className="formRow">
							<input
								type="number"
								placeholder="Pack size"
								value={packSizeValue}
								onChange={(e) =>
									setPackSizeValue(e.target.value)
								}
								className={
									formError === 'pack' ? 'formError' : null
								}
							/>
							<div className="toggleSwitch">
								<p>Amount</p>
								<label class="switch">
									<input
										type="checkbox"
										onChange={(e) =>
											setCheckboxValue(e.target.checked)
										}
										checked={checkboxValue}
									/>
									<span class="slider round"></span>
								</label>
								<p>Weight</p>
							</div>
						</div>
						<input
							type="number"
							placeholder="Quantity"
							value={quantityValue}
							onChange={(e) => setQuantityValue(e.target.value)}
						/>
						<div className="selectWrapper">
							<BiDownArrow />
							<select
								onChange={(e) =>
									setStoredInValue(e.target.value)
								}>
								<option value="" disabled selected>
									Stored in
								</option>
								{storages?.map((s) => (
									<option
										value={s.name}
										selected={
											storedInValue === s.name
												? true
												: false
										}>
										{s.name}
									</option>
								))}
							</select>
						</div>
						<div className="selectWrapper">
							<BiDownArrow />
							<select
								onChange={(e) => setDrawValue(e.target.value)}>
								<option value="" disabled selected>
									Draw/shelf
								</option>
								{currentShelves.map((shelf, i) => (
									<option
										value={shelf ? shelf : i + 1}
										selected={
											drawValue === shelf ? true : false
										}>
										{shelf ? shelf : `shelf ${i + 1}`}
									</option>
								))}
								<option value="">none</option>
							</select>
						</div>
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
								reset
							</button>
							<button className="btn btnPrimary">Submit</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default ItemForm;
