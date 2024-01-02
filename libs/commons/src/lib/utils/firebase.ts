import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
	apiKey: 'AIzaSyBreftXO2zQZA4ENo7OOWYVjtLiXBZ7FF4',
	authDomain: 'kwicon-383009.firebaseapp.com',
	projectId: 'kwicon-383009',
	storageBucket: 'kwicon-383009.appspot.com',
	messagingSenderId: '44047846137',
	appId: '1:44047846137:web:e9f9bee2ac919fb6d93028',
	measurementId: 'G-40N8EYMNNC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

let tokenRequested = false;

export function requestForToken(setFcmToken: any) {
	if (!tokenRequested) {
		tokenRequested = true;

		navigator.serviceWorker
			.register('./firebase-messaging-sw.js')
			.then(registration => {
				// Use the service worker registration with getToken()
				getToken(messaging, {
					vapidKey:
						'BHDiTnG9U68mh67xuINj_oBnxtD5SKstD793QZGVHXqS9lp1_GsoZUsYirIoivHZlEuRSGfFNDyOjs3Bk82iZyA',
					serviceWorkerRegistration: registration,
				})
					.then(token => {
						setFcmToken(token);
					})
					.catch(error => {
						throw new Error(error as string);
						// console.log('Error retrieving FCM token:', error);
					});
			})
			.catch(error => {
				throw new Error(error as string);
			});
	}
}

// export const requestForToken = (setFcmToken: any) => {
// 	if (!tokenRequested) {
// 		tokenRequested = true;

// 		console.log('Inside requestForToken', tokenRequested);

// 		return getToken(messaging, {
// 			vapidKey: envKeys.FIREBASE_VAPI_KEY,
// 		})
// 			.then(currentToken => {
// 				console.log('currentToken', currentToken);
// 				setFcmToken(currentToken);
// 			})
// 			.catch(err => {
// 				// console.log('An error occurred while retrieving token. ', err);
// 			});
// 	}
// };

export const onMessageListener = () =>
	new Promise(resolve => {
		onMessage(messaging, payload => {
			resolve(payload);
		});
	});
