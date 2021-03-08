import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addNewItem,
	getAllUsersItems,
	selectItems,
	setError,
	updateItem,
} from '../../features/items/itemsSlice';
import { selectUser } from '../../features/user/userSlice';
import './index.css';
import { BiDownArrow } from 'react-icons/bi';
import { useParams } from 'react-router-dom';

const ItemForm = ({ editable }) => {
	const { userDocId } = useSelector(selectUser);
	const { items } = useSelector(selectItems);
	const dispatch = useDispatch();
	const { id } = useParams();

	const [nameValue, setNameValue] = useState('');
	const [packSizeValue, setPackSizeValue] = useState('');
	const [quantityValue, setQuantityValue] = useState('');
	const [storedInValue, setStoredInValue] = useState('');
	const [drawValue, setDrawValue] = useState('');
	const [checkboxValue, setCheckboxValue] = useState(false);
	const [formError, setFormError] = useState('');

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
			dispatch(
				setError({
					message:
						'A required field is missing, please check the form',
				})
			);
		}
	};

	useEffect(() => {
		if (editable) {
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
		}
	}, []);

	return (
		<div className="itemForm">
			<div className="formContainer">
				<form action="" onSubmit={(e) => handleSubmit(e)}>
					<input
						type="text"
						placeholder="Item Name"
						value={nameValue}
						onChange={(e) => setNameValue(e.target.value)}
						className={formError === 'name' ? 'formError' : null}
					/>
					<div className="formRow">
						<input
							type="number"
							placeholder="Pack size"
							value={packSizeValue}
							onChange={(e) => setPackSizeValue(e.target.value)}
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
							onChange={(e) => setStoredInValue(e.target.value)}>
							<option value="" disabled selected>
								Stored in
							</option>
							<option
								value="big freezer"
								selected={
									storedInValue === 'big freezer'
										? true
										: false
								}>
								Big freezer
							</option>
						</select>
					</div>
					<div className="selectWrapper">
						<BiDownArrow />
						<select onChange={(e) => setDrawValue(e.target.value)}>
							<option value="" disabled selected>
								Draw/shelf
							</option>
							<option
								value="1"
								selected={drawValue === '1' ? true : false}>
								1
							</option>
							<option
								value="2"
								selected={drawValue === '2' ? true : false}>
								2
							</option>
							<option
								value="3"
								selected={drawValue === '3' ? true : false}>
								3
							</option>
						</select>
					</div>
					<button className="btn btnPrimary">Submit</button>
				</form>
			</div>
		</div>
	);
};

export default ItemForm;
