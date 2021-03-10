import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectItems } from '../../features/items/itemsSlice';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './index.css';
import ToolBar from '../Toolbar/ToolBar';

const ItemsList = () => {
	const { items, filtered, filteredItems } = useSelector(selectItems);
	const [zeroQuantValue, setZeroQuantValue] = useState(false);
	const [itemsToDisplay, setItemsToDisplay] = useState([]);

	useEffect(() => {
		if (filtered) {
			setItemsToDisplay(filteredItems);
		} else {
			setItemsToDisplay(items);
		}
	}, [items, filtered, filteredItems]);
	return (
		<div className="itemsList">
			<ToolBar setZeroQuantValue={setZeroQuantValue} />
			<div className="allItems">
				{itemsToDisplay.map((item) =>
					item.quantity || zeroQuantValue ? (
						<div className="itemRow">
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
							<div className="itemAmount">
								<AiOutlinePlus />
								<p>{item.quantity} </p>
								<AiOutlineMinus />
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
