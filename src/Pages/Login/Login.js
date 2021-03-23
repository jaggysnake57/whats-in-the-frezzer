import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setMessage } from '../../features/UI/UISlice';
import { getUser, loginUser, selectUser } from '../../features/user/userSlice';
import './index.css';

const Login = () => {
	const dispatch = useDispatch();
	const [emailValue, setEmailValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	const { userDocId } = useSelector(selectUser);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (emailValue && passwordValue) {
			dispatch(loginUser(emailValue, passwordValue));
		} else {
			dispatch(
				setMessage({
					type: 'error',
					content: 'please fill in email and password',
				})
			);
		}
	};
	return (
		<div className="login">
			{userDocId ? (
				<Redirect to="/" />
			) : (
				<div className="loginFormBox">
					<h1>login</h1>
					<form action="" onSubmit={(e) => handleSubmit(e)}>
						<div className="inputGroup">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								name="email"
								value={emailValue}
								onChange={(e) => setEmailValue(e.target.value)}
							/>
						</div>
						<div className="inputGroup">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								name="password"
								value={passwordValue}
								onChange={(e) =>
									setPasswordValue(e.target.value)
								}
							/>
						</div>
						<button className="btn btnPrimary">Login</button>
					</form>
					<p>
						not a member, <Link to="/signUp">Sign up here</Link>
					</p>
				</div>
			)}
		</div>
	);
};

export default Login;
