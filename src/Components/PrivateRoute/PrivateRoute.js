import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { selectUser } from '../../features/user/userSlice';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { userDocId } = useSelector(selectUser);
	return (
		<Route
			{...rest}
			render={(props) => {
				return userDocId ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				);
			}}></Route>
	);
};

export default PrivateRoute;
