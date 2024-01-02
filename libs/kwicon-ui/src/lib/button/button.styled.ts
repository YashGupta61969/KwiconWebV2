import styled from 'styled-components';
import { ButtonProps } from './button';

export const StyledButton = styled.button.attrs(props => ({
	type: props.type ?? 'button',
}))<ButtonProps>`
	position: relative;

	display: flex;
	align-items: center;
	justify-content: center;

	${({ loading }) => {
		if (loading) {
			return `
      gap: 0.5rem;
    `;
		}
	}}

	margin: ${props => props.m ?? ''};
	margin-top: ${props => props.mt ?? props.my ?? ''};
	margin-bottom: ${props => props.mb ?? props.my ?? ''};
	margin-left: ${props => props.ml ?? props.mx ?? ''};
	margin-right: ${props => props.mr ?? props.mx ?? ''};

	padding: ${props => props.p ?? ''};
	padding-top: ${props => props.pt ?? props.py ?? ''};
	padding-bottom: ${props => props.pb ?? props.py ?? ''};
	padding-left: ${props => props.pl ?? props.px ?? ''};
	padding-right: ${props => props.pr ?? props.px ?? ''};

	width: ${props => {
		switch (props.width) {
			case 'full':
				return '100%';
			case 'auto':
				return 'auto';
			default:
				return props.width ?? '';
		}
	}};
	height: ${props => props.height ?? ''};

	border: ${props => {
		switch (props.variant) {
			case 'primary':
				return 'none';
			case 'secondary':
				return 'none';

			case 'ghost':
				return `1px solid ${props.theme.palettes.colors.primary}`;

			case 'text':
				return 'none';

			case 'tertiary':
				return 'none';
			case 'unstyled':
				return 'none';
			default:
				return 'none';
		}
	}};
	outline: none;
	border-radius: ${props => {
		switch (props.variant) {
			case 'primary':
				return props.theme.borderRadius.pill;
			case 'secondary':
				return props.theme.borderRadius.pill;
			case 'ghost':
				return props.theme.borderRadius.pill;
			case 'text':
				return 'none';
			case 'tertiary':
				return props.theme.borderRadius.regular;
			case 'unstyled':
				return 'none';
			default:
				return props.borderRadius ?? props.theme.borderRadius.pill;
		}
	}};

	font-size: 1rem;
	font-weight: 700;

	${({ size }) => {
		switch (size) {
			case 'small':
				return `
          padding: 0.5rem;
          font-size: 0.75rem;
        `;
			case 'medium':
				return `
          padding: 0.75rem;
          font-size: 1rem;
        `;
			case 'large':
				return `
          padding: 1.5rem;
          fontSize: 1.125rem;
        `;
		}
	}}

	background-color: ${props => {
		switch (props.variant) {
			case 'primary':
				return props.theme.palettes.colors.primary;
			case 'secondary':
				return props.theme.palettes.colors.white;

			case 'ghost':
				return 'transparent';

			case 'text':
				return 'transparent';

			case 'tertiary':
				return props.theme.palettes.colors.lightGray[0];
			case 'unstyled':
				return 'transparent';
			default:
				return props.theme.palettes.colors.primary;
		}
	}};

	color: ${props => {
		switch (props.variant) {
			case 'primary':
				return props.theme.palettes.colors.white;
			case 'secondary':
				return props.theme.palettes.colors.primary;

			case 'ghost':
				return props.theme.palettes.colors.primary;

			case 'text':
				return props.theme.palettes.colors.primary;

			case 'tertiary':
				return props.theme.palettes.colors.darkBlue[0];
			case 'unstyled':
				return props.theme.palettes.colors.primary;
			default:
				return props.theme.palettes.colors.white;
		}
	}};

	&:active {
		transform: ${props => props.theme.transform.scale.buttonActive};
	}

	&:hover {
		background-color: ${props => {
			switch (props.variant) {
				case 'primary':
					return '';
				case 'secondary':
					return '';
				case 'ghost':
					return props.theme.palettes.colors.white;
				case 'text':
					return '';
				case 'tertiary':
					return '';
				case 'unstyled':
					return '';
				default:
					return '';
			}
		}};
	}

	&:disabled {
		background-color: ${props => {
			switch (props.variant) {
				case 'primary':
					return props.theme.palettes.colors.darkBlue[1];
				case 'secondary':
					return '';
				case 'ghost':
					return '';
				case 'text':
					return '';
				case 'tertiary':
					return '';
				case 'unstyled':
					return '';
				default:
					return props.theme.palettes.colors.darkBlue[1];
			}
		}};
		color: ${props => {
			switch (props.variant) {
				case 'primary':
					return '';
				case 'secondary':
					return props.theme.palettes.colors.darkBlue[1];
				case 'ghost':
					return props.theme.palettes.colors.darkBlue[1];
				case 'text':
					return props.theme.palettes.colors.darkBlue[1];
				case 'tertiary':
					return props.theme.palettes.colors.darkBlue[1];
				case 'unstyled':
					return props.theme.palettes.colors.lightBlue[0];
				default:
					return '';
			}
		}};
		border: ${props => {
			switch (props.variant) {
				case 'primary':
					return 'none';
				case 'secondary':
					return 'none';
				case 'ghost':
					return `1px solid ${props.theme.palettes.colors.darkBlue[1]}`;
				case 'text':
					return 'none';
				case 'tertiary':
					return 'none';
				case 'unstyled':
					return 'none';
				default:
					return 'none';
			}
		}};

		pointer-events: none;
	}

	transition: all ${props => props.theme.transition.duration.fast} ease-in-out;

	cursor: pointer;

	.loader-state {
		position: absolute;
		right: 1.6rem;
	}
`;
