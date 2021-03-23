import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { selectUser } from '../../features/user/userSlice';
import { auth } from '../../firebase';
import './index.css';

const Navbar = () => {
	const { username, avatar } = useSelector(selectUser);
	const [itemsDropdownOpen, setItemsDropdownOpen] = useState(false);
	const [storagesDropdownOpen, setStoragesDropdownOpen] = useState(false);
	const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
	const [navMenuOpen, setNavMenuOpen] = useState(false);
	const history = useHistory();

	history.listen((location, action) => {
		setStoragesDropdownOpen(false);
		setItemsDropdownOpen(false);
		setProfileDropdownOpen(false);
		setNavMenuOpen(false);
	});

	const handleDropdownToggles = (dropdown) => {
		switch (dropdown) {
			case 'items':
				setItemsDropdownOpen(!itemsDropdownOpen);
				setStoragesDropdownOpen(false);
				setProfileDropdownOpen(false);
				break;
			case 'storages':
				setStoragesDropdownOpen(!storagesDropdownOpen);
				setItemsDropdownOpen(false);
				setProfileDropdownOpen(false);
				break;
			case 'profile':
				setProfileDropdownOpen(!profileDropdownOpen);
				setStoragesDropdownOpen(false);
				setItemsDropdownOpen(false);

			default:
				break;
		}
	};

	const handleNavMenu = () => {
		setStoragesDropdownOpen(false);
		setItemsDropdownOpen(false);
		setProfileDropdownOpen(false);
		setNavMenuOpen(!navMenuOpen);
	};

	return (
		<div className="navbar">
			<div className="container">
				<h1>Whats in the Freezer</h1>
				<nav className={`navMenu ${navMenuOpen ? 'navOpen' : null}`}>
					<Link to="/">Home</Link>

					<div className="dropdown">
						<p onClick={() => handleDropdownToggles('items')}>
							Items
						</p>
						<div
							className={`dropdownLinks itemsDropdownLinks ${
								itemsDropdownOpen ? 'open' : ''
							}`}>
							<Link to="/items">View All Items</Link>
							<Link to="/items/new">Add New Item</Link>
						</div>
					</div>
					<div className="dropdown">
						<p onClick={() => handleDropdownToggles('storages')}>
							Storages
						</p>
						<div
							className={`dropdownLinks storagesDropdownLinks ${
								storagesDropdownOpen ? 'open' : ''
							}`}>
							<Link to="/storages">View All Storages</Link>
							<Link to="/storages/new">Add New Storage</Link>
						</div>
					</div>
				</nav>
				<div className="burger" onClick={() => handleNavMenu()}>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<div className="userMini">
					{username ? (
						<div className="dropdown">
							<p
								className="userHandle"
								onClick={() =>
									handleDropdownToggles('profile')
								}>
								Hello {username}
							</p>
							<img
								src={avatar}
								alt="avatar"
								onClick={() => handleDropdownToggles('profile')}
							/>
							<div
								className={`dropdownLinks ${
									profileDropdownOpen ? 'open' : ''
								}`}>
								<Link to="/user">View Profile</Link>
								<p onClick={() => auth.signOut()}>Logout</p>
							</div>
						</div>
					) : (
						<>
							<Link to="/login">Log In</Link>
							<Link to="/signup">Sign Up</Link>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
