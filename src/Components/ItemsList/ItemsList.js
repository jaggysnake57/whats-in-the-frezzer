import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems, updateQuant } from '../../features/items/itemsSlice';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
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
			<ToolBar setZeroQuantValue={setZeroQuantValue} />
			<div className="allItems">
				{itemsToDisplay.map((item) =>
					item.quantity || zeroQuantValue ? (
						<div className="itemRow" key={item.id}>
							<p>{item.name}</p>
							<p>
								in {item.storedInName}, in draw {item.draw}
							</p>
							<p>
								pack size -{' '}
								{item.packSizeWGT == 0
									? item.packSizeAMT
									: `${item.packSizeWGT}g`}
							</p>
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
							<Link
								className="btn btnPrimary"
								to={`/items/${item.id}`}>
								Edit
							</Link>
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
