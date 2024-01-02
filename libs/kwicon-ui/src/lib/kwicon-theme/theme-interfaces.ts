//* Colors
export interface IColors {
	primary: string | string[];
	secondary: string | string[];
	lightBlue: string | string[];
	blueBackground: string | string[];
	black: string | string[];
	white: string | string[];
	whiteShade: string | string[];
	darkBlue: string | string[];
	lightGray: string | string[];
	primaryBg: string | string[];
}

//* Accent Colors
export interface IAccents {
	peach: string | string[];
	biscuit: string | string[];
	lime: string | string[];
	paste: string | string[];
	cyan: string | string[];
	pink: string | string[];
	grape: string | string[];
}

//* Heading
export interface IHeading {
	fontSize: string | number;
	fontWeight: string | number;
	lineHeight: string | number;
	letterSpacing: string | number;
}

//* Paragraph
export interface IParagraph {
	fontSize: string | number;
	fontWeight: string | number;
	lineHeight: string | number;
	letterSpacing: string | number;
	color: string | string[];
}

//* Form Elements
export interface IFormElements {
	// label
	label: {
		fontStyle: string;
		fontSize: string | number;
		fontWeight: string | number;
	};
}

export interface IDefaultElementProps {
	m?: number | string;
	mt?: number | string;
	mr?: number | string;
	mb?: number | string;
	ml?: number | string;
	mx?: number | string;
	my?: number | string;
	p?: number | string;
	pt?: number | string;
	pr?: number | string;
	pb?: number | string;
	pl?: number | string;
	px?: number | string;
	py?: number | string;

	width?: number | string | 'auto' | 'full';
	height?: number | string;

	bg?: string;
	color?: string;

	border?: string;
	borderColor?: string;
	borderRadius?: string;
	boxShadow?: string;
	opacity?: number;
	overflow?: string;
	cursor?: string;

	outline?: string;

	position?: string;
	top?: string | number;
	right?: string | number;
	bottom?: string | number;
	left?: string | number;
	zIndex?: number;
}

//* Theme Interface
export interface IKwiconTheme {
	palettes: {
		mode: 'light' | 'dark';

		colors: IColors;

		accents: IAccents;

		error: string | string[];
		success: string | string[];
		warning: string | string[];
	};

	typography: {
		fontFamily: string;
		fontSize: string | number;
		fontWeight: string | number;
		lineHeight: string | number;
		letterSpacing: string | number;

		heading1: IHeading;
		heading2: IHeading;
		heading3: IHeading;
		heading4: IHeading;

		paragraph1: IParagraph;
		paragraph2: IParagraph;
		paragraph3: IParagraph;
	};

	formElements: IFormElements;

	spacing: {
		xxs: string | number;
		xs: string | number;
		sm: string | number;
		md: string | number;
		lg: string | number;
		xl: string | number;
		xxl: string | number;
	};

	breakpoints: {
		xs: string | number;
		sm: string | number;
		md: string | number;
		lg: string | number;
		xl: string | number;
		xxl: string | number;
	};

	shadows: {
		regular: string;
	};

	borderRadius: {
		circle: string;
		regular: string;
		pill: string;
	};

	zIndex: {
		xs: number;
		sm: number;
		md: number;
		lg: number;
		xl: number;
		xxl: number;
	};

	transition: {
		type: {
			ease: string;
			easeIn: string;
			easeOut: string;
			easeInOut: string;
			linear: string;
			cubic: {
				back: string;
				circ: string;
				expo: string;
				quad: string;
				quart: string;
				quint: string;
				sine: string;
			};
		};
		duration: {
			slow: string;
			regular: string;
			fast: string;
		};
	};

	transform: {
		scale: {
			buttonActive: string;
		};
	};

	iconButton: {
		size: {
			sm: string | number;
			md: string | number;
			lg: string | number;
		};
	};
}
