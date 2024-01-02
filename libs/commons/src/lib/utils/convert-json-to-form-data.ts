/**
 * Convert JSON to FormData
 *
 * @example
 * const formData = convertJSONToFomData({ name: 'John', age: 30 });
 *  // formData will be like this
 * // formData = {
 * //   name: 'John',
 * //   age: 30
 * // }
 *
 * @param json - The JSON object to convert to FormData
 * @returns  FormData object
 * @throws TypeError if the input is not a valid JSON object
 */
interface JSONFormData {
	[key: string]: string | Blob | File;
}

export const convertJSONToFormData = (json: JSONFormData): FormData => {
	if (typeof json !== 'object' || json === null || Array.isArray(json)) {
		throw new TypeError('Input must be a valid JSON object'); // throw error if the input is not a valid JSON object
	}
	const formData = new FormData();

	// looping through the JSON object and append each key-value pair to the FormData object
	for (const key in json) {
		if (Object.prototype.hasOwnProperty.call(json, key)) {
			formData.append(key, json[key]);
		}
	}
	return formData;
};
