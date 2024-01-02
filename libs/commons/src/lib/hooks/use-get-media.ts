import { useEffect, useState } from 'react';
import axios from 'axios';
import endpoints from '../config/endpoints';
import envKeys from '../constants/env-keys';
import cookies from '../utils/cookies';
import { Buffer } from 'buffer';

/**
 * @description
 * This hook is used to get the media from the server with mediaId. It returns the media in base64 format. It's recommended to use this hook in order to get any media from azure blob storage.
 * @param mediaId
 * @returns
 */
export const useGetMedia = (mediaId: string | undefined | null) => {
	const [mediaLoader, setMediaLoader] = useState<boolean>(false);
	const [media, setMedia] = useState<any>(null);

	// converting the raw image file that's coming as string form the server in File object
	useEffect(() => {
		if (mediaId) {
			setMediaLoader(true);
			axios
				.get(
					`${envKeys.API_URL + endpoints.media.getMedia}?mediaId=${mediaId}`, // api endpoint
					{
						headers: {
							Authorization: `Bearer ${cookies.get('access_token')}`,
						},
						responseType: 'arraybuffer', // this is important
					},
				)
				.then(res => {
					const data = `data:${res.headers['content-type']};base64,${new Buffer(
						res.data,
						'binary',
					).toString('base64')}`;
					setMediaLoader(false);
					setMedia(data);
				})
				.catch(err => {
					throw new Error(err);
				})
				.finally(() => setMediaLoader(false));
		}
	}, [mediaId]);

	return {
		media,
		mediaLoader,
	};
};

export default useGetMedia;
