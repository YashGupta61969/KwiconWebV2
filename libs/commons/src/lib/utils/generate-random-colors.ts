// generate random color according to the accent colors
export const generateRandomColor = () => {
	// generate random number between 0 to 6
	const randomNum = Math.floor(Math.random() * 6);
	// make an array of accent colors
	const accentColors = [
		'#FFDBDB',
		'#FFE8D2',
		'#FDFECE',
		'#E5FFF0',
		'#DFF5FF',
		'#FAE5FF',
		'#E9DFFF',
	];

	return accentColors[randomNum] as string;
};

export default generateRandomColor;
