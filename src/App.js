import React, { useEffect, useState } from 'react';
import { FormControl, Input, IconButton } from '@material-ui/core';
import './App.css';
import Message from './Components/Message/Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';

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
				setMessages(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						message: doc.data(),
					}))
				);
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
			<img
				src='https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=100&h=100'
				alt='Facebook Messanger App'
				className='logo'
			/>
			<h1>Facebook Messanger App</h1>
			<h3>Welcome {username}</h3>
			<form className='app__form'>
				<FormControl className='app__formControl'>
					<Input
						className='app__input'
						placeholder='Enter your message...'
						variant='outlined'
						value={input}
						onChange={(event) => setInput(event.target.value)}
					/>
					<IconButton
						className='app__iconButton'
						variant='contained'
						color='primary'
						type='submit'
						disabled={!input}
						onClick={sendMessages}>
						<SendIcon />
					</IconButton>
				</FormControl>
			</form>

			<FlipMove>
				{messages.map(({ id, message }) => (
					<Message key={id} username={username} message={message} />
				))}
			</FlipMove>
		</div>
	);
}

export default App;
