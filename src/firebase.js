import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCmfVIvylTbURMJWUBkO4PEbFgCx_KwrPo',
	authDomain: 'whats-in-the-fridge-f9f5b.firebaseapp.com',
	projectId: 'whats-in-the-fridge-f9f5b',
	storageBucket: 'whats-in-the-fridge-f9f5b.appspot.com',
	messagingSenderId: '25787309746',
	appId: '1:25787309746:web:8a6008902ade9472cdb3ab',
	measurementId: 'G-EH6PYP27F5',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
