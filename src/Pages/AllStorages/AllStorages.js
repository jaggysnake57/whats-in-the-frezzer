import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const AllStorages = () => {
	return (
		<div className="allStorages">
			<h1>All Storages</h1>
			{/* 
			name
			draws
			shelf names
			edit button


			 */}

			<div className="row">
				<h2>name</h2>
				<p>draws - 5</p>
				<div className="shelfNames">
					<ul>
						<li>top</li>
						<li>ice</li>
						<li>kids</li>
					</ul>
				</div>
				<Link className="btn btnPrimary" to={`/storages/klasdjfklj`}>
					Edit
				</Link>
			</div>
		</div>
	);
};

export default AllStorages;
