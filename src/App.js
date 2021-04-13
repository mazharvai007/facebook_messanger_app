import React, { useEffect, useState } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';
import Message from './Components/Message/Message';
import db from './firebase';
import firebase from 'firebase';

function App() {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState([]);
	const [username, setUsername] = useState('');

	/**
	 * Get data from FireStore
	 */
	useEffect(() => {
		// The code will run when the app component loads
		db.collection('messages')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) => {
				setMessages(snapshot.docs.map((doc) => doc.data()));
			});
	}, []);

	/**
	 * Get Username
	 */
	useEffect(() => {
		// Get username from user
		// const name = prompt('Please enter your name...');
		// setUserName(name);
		setUsername(prompt('Please enter your name...'));
	}, []);

	const sendMessages = (event) => {
		// Stop refreshing
		event.preventDefault();

		/**
		 * All logic to goes here of send messages
		 */

		// When user send message that will stored to messages and set them as an array. It is working like array.push
		// setMessages([...messages, { username: username, message: input }]);

		// Store messages on Firebase
		db.collection('messages').add({
			messages: input,
			username: username,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});

		// After sending message the write message field will be empty
		setInput('');
	};

	return (
		<div className='App'>
			<h1>Facebook Messanger App</h1>
			<h3>Welcome {username}</h3>
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
				<Message username={username} message={message} />
			))}
		</div>
	);
}

export default App;
