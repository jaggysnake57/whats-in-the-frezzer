import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../../features/user/userSlice';
import './index.css';

const User = () => {
	const { name, username, email, avatar } = useSelector(selectUser);

	return (
		<div className="user">
			<div className="leftPane">
				<h1>{`${name?.first} ${name.last}`}</h1>
				<h2>{username}</h2>
				<p>{email}</p>
				<Link className="btn btnPrimary" to="/user/edit">
					Edit
				</Link>
			</div>
			<div className="rightPane">
				<img src={avatar} alt="" />
			</div>
		</div>
	);
};

export default User;
