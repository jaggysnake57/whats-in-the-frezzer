import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectItems,
	setFiltered,
	setFilteredItems,
} from '../../features/items/itemsSlice';
import './index.css';

const FilterBar = ({ setZeroQuantValue }) => {
	const dispatch = useDispatch();
	const { items, filtered } = useSelector(selectItems);

	const [searchValue, setSearchValue] = useState('');

	const [locationValue, setLocationValue] = useState('');
	const [tagsValue, setTagsValue] = useState({});

	useEffect(() => {
		if (searchValue) {
			console.log(searchValue);
			if (!filtered) {
				dispatch(setFiltered(true));
			}
			const newFilteredItems = items.filter((item) => {
				if (item.name.search(searchValue) !== -1) {
					return item;
				}
			});
			dispatch(setFilteredItems(newFilteredItems));
		} else {
			console.log('clear filter');
			dispatch(setFiltered(false));
			dispatch(setFilteredItems([]));
		}
	}, [searchValue]);

	return (
		<div className="toolbar">
			<div className="searchBar">
				<input
					type="text"
					placeholder="Search...."
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					className="searchInput"
				/>
			</div>
			<div className="filterBar">
				<div className="checkWrapper">
					<input
						type="checkbox"
						name="zeroQuant"
						id="zeroQuant"
						onChange={(e) => setZeroQuantValue(e.target.checked)}
						className="checkboxHide"
					/>
					<label htmlFor="zeroQuant" className="checkLabel">
						Show 0 Quantity Items
					</label>
				</div>
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
	);
};

export default FilterBar;
