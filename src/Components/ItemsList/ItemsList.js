import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectItems } from '../../features/items/itemsSlice';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './index.css';

const ItemsList = () => {
	const { items } = useSelector(selectItems);
	const [searchValue, setSearchValue] = useState('');

	const handleInputChange = (value) => {
		setSearchValue(value);
	};

	return (
		<div className="itemsList">
			<div className="toolbar">
				<div className="searchBar">
					<input
						type="text"
						placeholder="Search...."
						value={searchValue}
						onChange={(e) => handleInputChange(e.target.value)}
					/>
				</div>
				<div className="filtersBar">
					<p>
						Show 0 Quantity Items{' '}
						<input type="checkbox" name="0Quant" id="" />
					</p>
					<p>Filters</p>
					<select name="" id="">
						<option value="" disabled selected>
							Location
						</option>
						<option value="">Big freezer</option>
					</select>
					<select name="" id="">
						<option value="" disabled selected>
							Tags
						</option>
						<option value="">Main</option>
						<option value="">Side</option>
						<option value="">desert</option>
					</select>
				</div>
			</div>
			<div className="allItems">
				{items.map((item) => (
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
				))}
			</div>
		</div>
	);
};

export default ItemsList;
