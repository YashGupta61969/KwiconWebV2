import axios from 'axios';
import envKeys from '../constants/env-keys';
import cookies from '../utils/cookies';

// TODO: add this endpoint on the environment file
//! ONLY FOR DEV PURPOSES

// axios instance
const api = axios.create({
	baseURL: envKeys.API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	// increased the timeout since our server is like a tortoise 🙂
	// although this is not a good practice
	timeout: 60000,
	timeoutErrorMessage: 'Request timed out',
});

// Add a request interceptor and add the bearer token to every request
api.interceptors.request.use(
	config => {
		const token = cookies.get('access_token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	error => {
		Promise.reject(error);
	},
);

// axios instance for localhost
export const localhostApi = axios.create({
	baseURL: 'http://localhost:3000/api/v2',
	headers: {
		'Content-Type': 'application/json',
	},
	// increased the timeout since our server is like a tortoise 🙂
	// although this is not a good practice
	timeout: 60000,
	timeoutErrorMessage: 'Request timed out',
});

// Add a request interceptor and add the bearer token to every request
localhostApi.interceptors.request.use(
	config => {
		const token = cookies.get('access_token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	error => {
		Promise.reject(error);
	},
);

export default api;
