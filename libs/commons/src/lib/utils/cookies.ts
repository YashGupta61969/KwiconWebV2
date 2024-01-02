export const cookies = {
	/**
	 * @description
	 * set cookie with name, value and expiration time in seconds
	 * @example
	 * cookies.set(refresh_token, 'refresh_token_value', 1800)
	 */
	set: (name: string, value: string, seconds: string) => {
		const expires = new Date(seconds);
		document.cookie = `${name}=${value}; expires=${expires.toUTCString()};path=/;Secure`;
	},

	/**
	 * @description get cookie value by name
	 * @example
	 * cookies.get('refresh_token')
	 * @returns cookie value
	 */
	get: (name: string) => {
		const nameEQ = `${name}=`;
		const ca = document.cookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	},

	/**
	 * @description check if the cookie is existed
	 * @example
	 * cookies.isExisted('refresh_token')
	 * @returns boolean
	 */
	isExisted: (name: string) => {
		return cookies.get(name) !== null;
	},

	/**
	 * @description check if the cookie is expired
	 * @example
	 * cookies.isExpired('refresh_token')
	 * @returns boolean
	 */
	isExpired: (name: string) => {
		return cookies.get(name) === null;
	},

	/**
	 * @description delete cookie by name
	 * @example
	 * cookies.delete('refresh_token')
	 */
	delete: (name: string) => {
		document.cookie = `${name}=; Max-Age=-99999999;`;
	},

	/**
	 * @description delete all cookies
	 * @example
	 * cookies.deleteAll()
	 */
	deleteAll: () => {
		const cookies = document.cookie.split(';');

		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i];
			const eqPos = cookie.indexOf('=');
			const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
			document.cookie = `${name}=;expires=${new Date(0).toUTCString()}`;
		}
	},
};
export default cookies;
