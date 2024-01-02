import envKeys from '../constants/env-keys';

/**
 * @description
 * Load image with token. This is used to load images from Blob Storage. Use this function to load images from Blob Storage that requires a SAS token.
 *
 * @param url string
 * @returns modified url with token
 *
 * @example
 * <img src={LoadImageWithToken('https://kwicondev.blob.core.windows.net/images/1.png')} />
 */
export const loadImageWithToken = (url: string) => {
	const token = envKeys.IMAGE_SAS_TOKEN;

	if (!token) {
		return url;
	} else {
		return `${url}?${token}`;
	}
};

export default loadImageWithToken;
