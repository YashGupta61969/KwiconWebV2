/**
 * Returns the year as a string from a given date string.
 *
 * @param {string} date - The date string from which to extract the year.
 * @returns {string} - The year as a string.
 *
 * @example
 * const year = getYearfromDate('2023-06-01');
 * console.log(year); // Output: "2023"
 */
export const getYearfromDate = (date: string | Date) => {
	const inputDate = new Date(date);
	const year = inputDate.getFullYear().toString();
	return year;
};

/**
 * Returns the month as a numeric value from a given date string.
 *
 * @param {string} date - The date string from which to extract the month.
 * @returns {string} - The month as a numeric value (1-12).
 *
 * @example
 * const month = getMonthfromDate('2023-06-01');
 * console.log(month); // Output: "6"
 */
export const getMonthfromDate = (date: string | Date) => {
	const inputDate = new Date(date);
	const month = inputDate.toLocaleString('en-US', { month: 'numeric' });
	return month;
};

/**
 * Returns a formatted string representing the year and month of the given date.
 * The format of the returned string is "Month Year" (e.g., "January 2022").
 *
 * @param date - The date string in a valid format.
 * @returns A formatted string representing the year and month of the given date.
 * @example
 * const formattedDate = getYearMonth("2021-01-01T00:00:00.000Z");
 * console.log(formattedDate); // Output: "January 2022"
 */
export const getYearMonth = (date: string | Date) => {
	const inputDate = new Date(date);
	const formattedDate = `${inputDate.toLocaleDateString('en-US', {
		month: 'long',
	})} ${inputDate.getFullYear()}`;
	return formattedDate;
};

/**
 * Returns a formatted string representing the relative time of the given date.
 * The format of the returned string is for example "1 day ago".
 *
 * @param date - The date string in a valid format.
 * @returns A formatted string representing the relative time of the given date.
 * @example
 * const formattedDate = getFromNowTime("2021-01-01T00:00:00.000Z");
 * console.log(formattedDate); // Output: "3 years ago"
 */
export const getFromNowTime = (date: string) => {
	const currDate = new Date();
	const seconds = Math.floor((currDate - Date.parse(date)) / 1000) + 1;

	let intervalType = '',
		intervalValue = 0;

	if (seconds < 60) {
		intervalType = 'second';
		intervalValue = seconds;
	} else if (seconds < 3600) {
		intervalType = 'min';
		intervalValue = Math.floor(seconds / 60);
	} else if (seconds < 86400) {
		intervalType = 'hour';
		intervalValue = Math.floor(seconds / 3600);
	} else if (seconds < 604800) {
		intervalType = 'day';
		intervalValue = Math.floor(seconds / 86400);
	} else if (seconds < 2592000) {
		intervalType = 'week';
		intervalValue = Math.floor(seconds / 604800);
	} else if (seconds < 31536000) {
		intervalType = 'month';
		intervalValue = Math.floor(seconds / 2592000);
	} else {
		intervalType = 'year';
		intervalValue = Math.floor(seconds / 31536000);
	}

	const suffix = intervalValue > 1 ? 's' : '';
	return `${intervalValue} ${intervalType}${suffix} ago`;
};

  
  const getHourMinutes = date => {
	const str = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
	return str;
  };
  
  const getTimestamp = date => {
	const options = {
	  year: 'numeric',
	  month: 'long',
	  day: 'numeric',
	};
	return date.toLocaleDateString(undefined, options);
  };
  
  const getYearMonthDate = date => {
	const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
	  .toString()
	  .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  
	return formattedDate;
  };
  
  const getMonthDateTime = date => {
	const options = {
	  month: 'short',
	  day: '2-digit',
	  hour: 'numeric',
	  minute: 'numeric',
	};
	return date.toLocaleDateString('en-US', options);
  };
  
  export const getDateFormat = (dateString, format) => {
	const date = new Date(dateString);
	let resultString = '';
  
	switch (format) {
	  case 'MMM DD, LT':
		resultString = getMonthDateTime(date);
		break;
	  case 'YYYY-MM-DD':
		resultString = getYearMonthDate(date);
		break;
	  case 'HH:mm':
		resultString = getHourMinutes(date);
		break;
	  case 'MMMM YYYY':
		resultString = getYearMonth(date);
		break;
	  case 'LL':
		resultString = getTimestamp(date);
		break;
	  case 'MM':
		resultString = getMonthfromDate(date);
		break;
	  case 'YYYY':
		resultString = getYearfromDate(date);
		break;
  
	  default:
		break;
	}
  
	return resultString;
  };