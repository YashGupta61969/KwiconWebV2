/**
 * Format secount to timer
 *
 * @example
 * const formatedtime = formatTimer(120);
 *  // formated time will be like this
 * // 02:00
 *
 * @param seconds - The seconds to convert to timer
 * @returns timer string
 */

export function formatTimer(param: number) {
	const minutes = Math.floor(param / 60)
		.toString()
		.padStart(2, '0');
	const seconds = (param % 60).toString().padStart(2, '0');
	return `${minutes}:${seconds}`;
}
