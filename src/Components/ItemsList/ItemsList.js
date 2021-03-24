import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteItem,
	selectItems,
	updateQuant,
} from '../../features/items/itemsSlice';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './index.css';
import ToolBar from '../Toolbar/ToolBar';
import Loading from '../../images/loading.gif';
import { selectUser } from '../../features/user/userSlice';

const ItemsList = () => {
	const dispatch = useDispatch();
	const { items, filtered, filteredItems } = useSelector(selectItems);
	const { userDocId } = useSelector(selectUser);
	const [zeroQuantValue, setZeroQuantValue] = useState(false);
	const [itemsToDisplay, setItemsToDisplay] = useState([]);
	const [quantChangeLocked, setQuantChangeLocked] = useState(false);
	const [lockedId, setLockedId] = useState('');
	const [showDelete, setShowDelete] = useState(false);
	const [currentOpenInfoWrapper, setCurrentOpenInfoWrapper] = useState('');

	const handleQuantityChange = (method, currentQuant, itemId) => {
		if (!quantChangeLocked) {
			setQuantChangeLocked(true);
			setLockedId(itemId);
			if (method === 'inc') {
				currentQuant++;
				dispatch(updateQuant(userDocId, itemId, currentQuant));
			} else if ((method = 'dec')) {
				if (currentQuant) {
					currentQuant--;
					dispatch(updateQuant(userDocId, itemId, currentQuant));
				} else {
					console.log('the minimum number is 0');
					setQuantChangeLocked(false);
					setLockedId('');
				}
			} else {
				console.log('there has been an error');
				setQuantChangeLocked(false);
			}
		}
	};

	const handleDelete = (itemId) => {
		dispatch(deleteItem(userDocId, itemId));
	};

	const handleInfoDropdown = (target) => {
		if (currentOpenInfoWrapper) {
			currentOpenInfoWrapper.classList.remove('infoOpen');
			currentOpenInfoWrapper.parentElement.classList.remove('rowExtend');
		}
		setCurrentOpenInfoWrapper(target.nextSibling);
		target.nextSibling.classList.add('infoOpen');
		target.parentElement.classList.add('rowExtend');
	};

	const closeInfoPanel = () => {
		currentOpenInfoWrapper.classList.remove('infoOpen');
		currentOpenInfoWrapper.parentElement.classList.remove('rowExtend');

		setCurrentOpenInfoWrapper('');
	};

	useEffect(() => {
		if (filtered) {
			setItemsToDisplay(filteredItems);
		} else {
			setItemsToDisplay(items);
		}
		setQuantChangeLocked(false);
		setLockedId('');
	}, [items, filtered, filteredItems]);

	return (
		<div className="itemsList">
			<ToolBar
				setZeroQuantValue={setZeroQuantValue}
				setShowDelete={setShowDelete}
				showDelete={showDelete}
			/>
			<div className="allItems">
				{itemsToDisplay.map((item) =>
					item.quantity || zeroQuantValue ? (
						<div className="itemRow" key={item.id}>
							<p className="itemName">{item.name}</p>
							<p
								className="infoButton"
								onClick={(e) => handleInfoDropdown(e.target)}>
								i
							</p>
							<div className="itemInfoWrapper">
								<p>
									{item.storedInName
										? `in ${item.storedInName}, in draw ${
												item.draw
													? item.draw
													: 'unknown'
										  }`
										: 'unknown'}
								</p>
								<p>
									pack size -{' '}
									{item.packSizeWGT == 0
										? item.packSizeAMT
										: `${item.packSizeWGT}g`}
								</p>

								<AiOutlineClose
									className="infoPanelClose"
									onClick={() => closeInfoPanel()}
								/>
							</div>
							<div
								className={`itemAmount ${
									quantChangeLocked ? 'locked' : ''
								}`}>
								<AiOutlineMinus
									onClick={() =>
										handleQuantityChange(
											'dec',
											item.quantity,
											item.id
										)
									}
								/>
								<p>
									{quantChangeLocked &&
									lockedId === item.id ? (
										<img src={Loading} alt="" />
									) : (
										item.quantity
									)}{' '}
								</p>
								<AiOutlinePlus
									onClick={() =>
										handleQuantityChange(
											'inc',
											item.quantity,
											item.id
										)
									}
								/>
							</div>
							{showDelete ? (
								<button
									className="btn btnDanger"
									onClick={() => handleDelete(item.id)}>
									Delete
								</button>
							) : (
								<Link
									className="btn btnPrimary"
									to={`/items/${item.id}`}>
									Edit
								</Link>
							)}
						</div>
					) : (
						''
					)
				)}
			</div>
		</div>
	);
};

export default ItemsList;
