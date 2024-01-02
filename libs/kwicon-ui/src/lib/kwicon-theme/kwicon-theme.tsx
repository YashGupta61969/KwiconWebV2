import { IKwiconTheme } from './theme-interfaces';

/**
 * @description
 * This is the default theme for Kwicon UI. All the corresponding interfaces for the theme can be found in the theme-interface.ts file. The basic theme properties are defined here and can be overridden or extended in the theme-provider.tsx file.
 *
 */
export const KwiconTheme: IKwiconTheme = {
	palettes: {
		mode: 'light',

		colors: {
			primary: '#2E3EE5',
			secondary: '#7581FF',
			lightBlue: [
				'#F0F1FF',
				'rgba(40, 53, 187, 0.08)',
				'rgba(40, 53, 187, 0.15)',
				'rgba(70, 75, 128, 0.4)',
			],
			blueBackground: '#F7F8FF',
			black: '#000000',
			white: '#FFFFFF',
			whiteShade: '#f9f9f9',
			darkBlue: ['#464B80', 'rgba(70, 75, 128, 0.4)'],
			lightGray: [
				'#F9F9F9',
				'#F2F2F2',
				'rgba(0, 0, 0, 0.6)',
				'rgba(79, 79, 79, 1)',
			],
			primaryBg: '#F7F8FC',
		},

		accents: {
			peach: '#FFDBDB',
			biscuit: '#FFE8D2',
			lime: '#FDFECE',
			paste: '#E5FFF0',
			cyan: '#DFF5FF',
			pink: '#FAE5FF',
			grape: '#E9DFFF',
		},

		error: ['#AF1111', '#EC6E6E', 'rgba(255, 245, 245, 1)'],
		success: ['#03690D', '#5CD568', 'rgba(235, 255, 237, 1)'],
		warning: ['#A97306', '#F9C255', 'rgba(255, 248, 235, 1)'],
	},

	typography: {
		fontFamily: 'Open Sans, sans-serif',
		fontSize: 16,
		fontWeight: 400,
		lineHeight: '1.2',
		letterSpacing: 0,

		heading1: {
			fontSize: '3rem',
			fontWeight: 700,
			lineHeight: '120%',
			letterSpacing: 0,
		},
		heading2: {
			fontSize: '2rem',
			fontWeight: 400,
			lineHeight: '130%',
			letterSpacing: 0,
		},
		heading3: {
			fontSize: '1.5rem',
			fontWeight: 700,
			lineHeight: '140%',
			letterSpacing: 0,
		},
		heading4: {
			fontSize: '1.25rem',
			fontWeight: 700,
			lineHeight: '150%',
			letterSpacing: 0,
		},

		paragraph1: {
			fontSize: '1.125rem',
			fontWeight: 400,
			lineHeight: '150%',
			letterSpacing: 0,
			color: 'rgba(79, 79, 79, 1)',
		},
		paragraph2: {
			fontSize: '1rem',
			fontWeight: 400,
			lineHeight: '150%',
			letterSpacing: 0,
			color: 'rgba(79, 79, 79, 1)',
		},
		paragraph3: {
			fontSize: '0.75rem',
			fontWeight: 400,
			lineHeight: '150%',
			letterSpacing: 0,
			color: 'rgba(79, 79, 79, 1)',
		},
	},

	formElements: {
		label: {
			fontSize: '1rem',
			fontWeight: 700,
			fontStyle: 'normal',
		},
	},

	spacing: {
		xxs: '0.25rem',
		xs: '0.5rem',
		sm: '1rem',
		md: '1.5rem',
		lg: '2rem',
		xl: '2.5rem',
		xxl: '3rem',
	},

	breakpoints: {
		xs: '0px',
		sm: '576px',
		md: '768px',
		lg: '992px',
		xl: '1200px',
		xxl: '1400px',
	},

	shadows: {
		regular: '0px -4px 12px rgba(0, 0, 0, 0.06)',
	},

	borderRadius: {
		circle: '50%',
		regular: '0.5rem',
		pill: '2.5rem',
	},

	zIndex: {
		xs: 1,
		sm: 10,
		md: 100,
		lg: 1000,
		xl: 10000,
		xxl: 100000,
	},

	transition: {
		type: {
			ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
			easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
			easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
			easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
			linear: 'linear',
			cubic: {
				back: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
				circ: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
				expo: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
				quad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
				quart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
				quint: 'cubic-bezier(0.86, 0, 0.07, 1)',
				sine: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
			},
		},
		duration: {
			slow: '0.5s',
			regular: '0.3s',
			fast: '0.2s',
		},
	},

	transform: {
		scale: {
			buttonActive: 'scale(0.98)',
		},
	},

	iconButton: {
		size: {
			sm: '1.5rem',
			md: '2rem',
			lg: '2.8125rem',
		},
	},
};
