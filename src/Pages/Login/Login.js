import React from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../features/user/userSlice';

const Login = () => {
	const dispatch = useDispatch();

	const handleUser = () => {
		dispatch(getUser());
	};
	return (
		<div className="login">
			<h1>login</h1>
			<button onClick={() => handleUser()}>login</button>
		</div>
	);
};

export default Login;
