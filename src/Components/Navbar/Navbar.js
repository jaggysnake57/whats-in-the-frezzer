import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../../features/user/userSlice';
import './index.css';

const Navbar = () => {
	const { username, avatar } = useSelector(selectUser);
	return (
		<div className="navbar">
			<div className="container">
				<h1>Whats in the Freezer</h1>
				<nav>
					<Link to="/">Home</Link>

					<div className="dropdown">
						<p>Items</p>
						<div className="dropdownLinks">
							<Link to="/items">View All Items</Link>
							<Link to="/items/new">Add New Item</Link>
						</div>
					</div>
					<div className="dropdown">
						<p>Storages</p>
						<div className="dropdownLinks">
							<Link to="/storages">View All Storages</Link>
							<Link to="/storages/new">Add New Storage</Link>
						</div>
					</div>
				</nav>
				<div className="burger">
					<div></div>
					<div></div>
					<div></div>
				</div>
				<div className="userMini">
					<Link to="/user">Hello {username}</Link>
					<img src={avatar} alt="" />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
