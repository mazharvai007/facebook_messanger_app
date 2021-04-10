import React, { useEffect, useState } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';
import Message from './Components/Message/Message';

function App() {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState([
		{ userName: 'Mazhar', text: 'Hi' },
		{ userName: 'Bristy', text: 'How are you?' },
		{ userName: 'Abdullah', text: 'What are you doing now?' },
	]);
	const [userName, setUserName] = useState('');

	useEffect(() => {
		// Get username from user
		// const name = prompt('Please enter your name...');
		// setUserName(name);
		setUserName(prompt('Please enter your name...'));
	}, []);
	console.log(userName);

	const sendMessages = (event) => {
		// Stop refreshing
		event.preventDefault();

		/**
		 * All logic to goes here of send messages
		 */

		// When user send message that will stored to messages and set them as an array. It is working like array.push
		setMessages([...messages, { userName: userName, text: input }]);

		// After sending message the write message field will be empty
		setInput('');
	};

	return (
		<div className='App'>
			<h1>Facebook Messanger App</h1>
			<form>
				<FormControl>
					<InputLabel>Enter your message...</InputLabel>
					<Input
						variant='outlined'
						value={input}
						onChange={(event) => setInput(event.target.value)}
					/>
				</FormControl>
				<Button
					variant='contained'
					color='primary'
					type='submit'
					disabled={!input}
					onClick={sendMessages}>
					Send Messages
				</Button>
			</form>

			{messages.map((message) => (
				<Message userName={message.userName} text={message.text} />
			))}
		</div>
	);
}

export default App;
