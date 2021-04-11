import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyAtpCGa7KBGd91enBYlJOWCGCYbmMmYqRI',
	authDomain: 'facebookmessangerapp-479d2.firebaseapp.com',
	projectId: 'facebookmessangerapp-479d2',
	storageBucket: 'facebookmessangerapp-479d2.appspot.com',
	messagingSenderId: '173682208279',
	appId: '1:173682208279:web:7ba46dc43a37e7d0293652',
	measurementId: 'G-MPM4SQWFRY',
});

const db = firebaseApp.firestore();

export default db;
