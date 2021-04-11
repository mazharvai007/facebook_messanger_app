import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import './Message.css';

function Message({ message, username }) {
	const isUser = username === message.username;
	console.log(message);
	console.log(username);
	return (
		<div className={`message ${isUser && 'userMessage'}`}>
			<Card className={isUser ? 'userMessageCard' : 'userMessageGuest'}>
				<CardContent>
					<Typography variant='p' component='p'>
						{message.username} : {message.text}
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
}

export default Message;
