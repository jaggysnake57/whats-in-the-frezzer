import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage, selectUI } from '../../features/UI/UISlice';

import './index.css';

const FlashMessage = () => {
	const { message } = useSelector(selectUI);
	const dispatch = useDispatch();

	return (
		<div className={`flashMessage ${message.type}`}>
			<div className="container">
				<p>{message.content}</p>

				<AiOutlineClose onClick={() => dispatch(clearMessage())} />
			</div>
		</div>
	);
};

export default FlashMessage;
