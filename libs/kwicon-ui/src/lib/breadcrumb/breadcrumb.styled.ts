import styled from 'styled-components';

export const BreadcrumbWrapper = styled.div`
	padding: '.5rem 1rem';

	display: flex;

	background-color: inherit;
	color: ${props => props.theme.palettes.colors.darkBlue[0]};
	font-size: 0.875rem;

	text-transform: capitalize;

	cursor: pointer;

	.separator {
		margin-left: 0.3125rem;
		margin-right: 0.3125rem;
		margin-top: 0.3125rem;
		color: ${props => props.theme.palettes.colors.darkBlue[0]};
	}

	.active-link {
		color: ${props => props.theme.palettes.colors.darkBlue[1]};
		cursor: text;
	}
`;
