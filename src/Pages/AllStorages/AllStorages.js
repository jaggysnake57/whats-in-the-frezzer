import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllUsersStorages } from '../../features/storages/storageSlice';
import { selectUser } from '../../features/user/userSlice';
import { selectStorages } from '../../features/storages/storageSlice';
import './index.css';

const AllStorages = () => {
	const { userDocId } = useSelector(selectUser);
	const { storages } = useSelector(selectStorages);
	const dispatch = useDispatch();
	const handleShelfDropdown = (e) => {
		const shelves = e.target.nextSibling;
		if (shelves.classList.contains('open')) {
			shelves.classList.remove('open');
		} else {
			shelves.classList.add('open');
		}
	};
	useEffect(() => {
		dispatch(getAllUsersStorages(userDocId));
	}, [userDocId]);

	return (
		<div className="allStorages">
			<h1>All Storages</h1>

			{storages?.map((store) => (
				<div className="row">
					<h2>{store?.name}</h2>
					<p>draws - {store.shelfNum}</p>
					<div className="shelfNamesContainer">
						<p onClick={(e) => handleShelfDropdown(e)}>
							Shelf Names
						</p>
						<ul className="shelves">
							{store.shelves.map((shelf) => (
								<li>{shelf}</li>
							))}
						</ul>
					</div>
					<Link
						className="btn btnPrimary"
						to={`/storages/${store.id}`}>
						Edit
					</Link>
				</div>
			))}
		</div>
	);
};

export default AllStorages;
