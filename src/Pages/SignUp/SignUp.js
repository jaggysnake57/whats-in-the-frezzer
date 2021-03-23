import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { setMessage } from '../../features/UI/UISlice';
import { createNewUser, selectUser } from '../../features/user/userSlice';
import './index.css';

const SignUp = () => {
	const dispatch = useDispatch();

	const [usernameValue, setUsernameValue] = useState('');
	const [emailValue, setEmailValue] = useState('');
	const [emailConfirmationValue, setEmailConfirmationValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	const [passwordConfirmationValue, setPasswordConfirmationValue] = useState(
		''
	);
	const { userDocId } = useSelector(selectUser);

	const handleSubmit = (event) => {
		event.preventDefault();
		//check email fields and password fields match
		if (
			emailValue === emailConfirmationValue &&
			passwordValue === passwordConfirmationValue
		) {
			//checks  to see if all fields are filled
			if (usernameValue && emailValue && passwordValue) {
				// submit form
				const newUser = {
					email: emailValue,
					password: passwordValue,
					username: usernameValue,
				};
				dispatch(createNewUser(newUser));
			} else {
				dispatch(
					setMessage({
						type: 'error',
						content: 'Please fill in all fields',
					})
				);
			}
		} else {
			//checks email fields are the same
			if (emailValue !== emailConfirmationValue) {
				dispatch(
					setMessage({
						type: 'error',
						content: 'emails do not match',
					})
				);
				// checks passwords are the same
			} else if (passwordValue !== passwordConfirmationValue) {
				dispatch(
					setMessage({
						type: 'error',
						content: 'passwords do not match',
					})
				);
			} else {
				dispatch(
					setMessage({
						type: 'error',
						content: 'Internal error. Please reset the form',
					})
				);
			}
		}
	};

	return (
		<div className="signUp">
			{userDocId ? (
				<Redirect to="/" />
			) : (
				<div className="signUpFormBox">
					<h1>Sign Up</h1>
					<form action="" onSubmit={(e) => handleSubmit(e)}>
						<div className="inputGroup">
							<label htmlFor="username">Username</label>
							<input
								type="text"
								name="username"
								value={usernameValue}
								onChange={(e) =>
									setUsernameValue(e.target.value)
								}
							/>
						</div>
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
							<label htmlFor="emailConfirm">Confirm Email</label>
							<input
								type="email"
								name="emailConfirm"
								value={emailConfirmationValue}
								onChange={(e) =>
									setEmailConfirmationValue(e.target.value)
								}
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
						<div className="inputGroup">
							<label htmlFor="passwordConfirm">
								Confirm Password
							</label>
							<input
								type="password"
								name="passwordConfirm"
								value={passwordConfirmationValue}
								onChange={(e) =>
									setPasswordConfirmationValue(e.target.value)
								}
							/>
						</div>
						<button className="btn btnPrimary">Submit</button>
					</form>
					<p>
						Already a member? Then{' '}
						<Link to="/login">Log in here</Link>{' '}
					</p>
				</div>
			)}
		</div>
	);
};

export default SignUp;
