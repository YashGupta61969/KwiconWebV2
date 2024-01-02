import api, { localhostApi } from './api';

export const client = {
	/**
	 * @description get request
	 * @example
	 * client.get('/api/endpoint', params)
	 * @param {string} url api endpoint
	 * @param {string} params query params
	 * @param  {...any} options axios options
	 * @returns axios response
	 */
	get: async (url: string, ...options: any) => api.get(url, { ...options }),

	/**
	 * @description post request
	 * @example
	 * client.post('/api/endpoint', value)
	 * @param {string} url api endpoint
	 * @param {object} data request body
	 * @param  {...any} options axios options
	 * @returns axios response
	 */
	post: async (url: string, data: unknown, ...options: any) =>
		api.post(url, data, ...options),

	/**
	 * @description put request
	 * @example
	 * client.put('/api/endpoint', value)
	 * @param {string} url api endpoint
	 * @param {object} data request body
	 * @param  {...any} options axios options
	 * @returns axios response
	 */
	put: async (url: string, data: unknown, ...options: any) =>
		api.put(url, data, ...options),

	/**
	 * @description patch request
	 * @example
	 * client.patch('/api/endpoint', value)
	 * @param {string} url api endpoint
	 * @param {object} data request body
	 * @param  {...any} options axios options
	 * @returns axios response
	 */
	patch: async (url: string, data: unknown, ...options: any) =>
		api.patch(url, data, ...options),

	/**
	 * @description delete request
	 * @example
	 * client.delete('/api/endpoint')
	 * @param {string} url api endpoint
	 * @param  {...any} options axios options
	 * @returns axios response
	 */
	// delete: async (url: string, ...options: any) => api.delete(url, ...options),
	delete: async (url: string, data?: object, ...options: any) =>
		api.delete(url, { data, ...options }),
};

export const localhostClient = {
	/**
	 * @description get request
	 * @example
	 * client.get('/api/endpoint', params)
	 * @param {string} url api endpoint
	 * @param {string} params query params
	 * @param  {...any} options axios options
	 * @returns axios response
	 */
	get: async (url: string, ...options: any) => localhostApi.get(url, { ...options }),

	/**
	 * @description post request
	 * @example
	 * client.post('/api/endpoint', value)
	 * @param {string} url api endpoint
	 * @param {object} data request body
	 * @param  {...any} options axios options
	 * @returns axios response
	 */
	post: async (url: string, data: unknown, ...options: any) =>
		localhostApi.post(url, data, ...options),

	/**
	 * @description put request
	 * @example
	 * client.put('/api/endpoint', value)
	 * @param {string} url api endpoint
	 * @param {object} data request body
	 * @param  {...any} options axios options
	 * @returns axios response
	 */
	put: async (url: string, data: unknown, ...options: any) =>
		localhostApi.put(url, data, ...options),

	/**
	 * @description patch request
	 * @example
	 * client.patch('/api/endpoint', value)
	 * @param {string} url api endpoint
	 * @param {object} data request body
	 * @param  {...any} options axios options
	 * @returns axios response
	 */
	patch: async (url: string, data: unknown, ...options: any) =>
		localhostApi.patch(url, data, ...options),

	/**
	 * @description delete request
	 * @example
	 * client.delete('/api/endpoint')
	 * @param {string} url api endpoint
	 * @param  {...any} options axios options
	 * @returns axios response
	 */
	// delete: async (url: string, ...options: any) => localhostApi.delete(url, ...options),
	delete: async (url: string, data?: object, ...options: any) =>
		localhostApi.delete(url, { data, ...options }),
};

export default client;
