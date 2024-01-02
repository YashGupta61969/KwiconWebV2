importScripts('https://www.gstatic.com/firebasejs/8.2.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.6/firebase-messaging.js');

firebase.initializeApp({
	apiKey: 'AIzaSyBreftXO2zQZA4ENo7OOWYVjtLiXBZ7FF4',
	authDomain: 'kwicon-383009.firebaseapp.com',
	projectId: 'kwicon-383009',
	storageBucket: 'kwicon-383009.appspot.com',
	messagingSenderId: '44047846137',
	appId: '1:44047846137:web:e9f9bee2ac919fb6d93028',
	measurementId: 'G-40N8EYMNNC',
});

const messaging = firebase.messaging();

// Configure background message handler
messaging.setBackgroundMessageHandler(function (payload) {
	console.log('Received background message:', payload);

	// Customize the handling of background messages
	// e.g., Show a notification, update data, etc.
});

self.addEventListener('push', function (event) {
	// Handle the push event here
	// You can access the notification payload using event.data.json()
	// Customize the handling of push notifications
	// e.g., Show a notification, update data, etc.
});
