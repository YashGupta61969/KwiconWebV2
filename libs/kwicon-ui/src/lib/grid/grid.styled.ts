import styled, { css } from 'styled-components';
import { GridItemProps, GridProps } from './grid';

export const StyledGrid = styled.div<GridProps>`
	display: grid;
	grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
	grid-gap: ${({ gap }) => gap || '1rem'};

	align-items: ${props => props.alignItems};
	${({ justifyContent }) =>
		justifyContent &&
		css`
			justify-content: ${justifyContent};
		`};
	${({ gridTemplateRows }) =>
		gridTemplateRows &&
		css`
			grid-template-rows: ${gridTemplateRows};
		`};
	${({ gridTemplateColumns }) =>
		gridTemplateColumns &&
		css`
			grid-template-columns: ${gridTemplateColumns};
		`};
	${({ gridAutoRows }) =>
		gridAutoRows &&
		css`
			grid-auto-rows: ${gridAutoRows};
		`};
	${({ gridAutoColumns }) =>
		gridAutoColumns &&
		css`
			grid-auto-columns: ${gridAutoColumns};
		`};
	${({ gridAutoFlow }) =>
		gridAutoFlow &&
		css`
			grid-auto-flow: ${gridAutoFlow};
		`};
	${({ gridRowGap }) =>
		gridRowGap &&
		css`
			grid-row-gap: ${gridRowGap};
		`};
	${({ gridColumnGap }) =>
		gridColumnGap &&
		css`
			grid-column-gap: ${gridColumnGap};
		`};
	${({ gridArea }) =>
		gridArea &&
		css`
			grid-area: ${gridArea};
		`};
	${({ gridRow }) =>
		gridRow &&
		css`
			grid-row: ${gridRow};
		`};
	${({ gridColumn }) =>
		gridColumn &&
		css`
			grid-column: ${gridColumn};
		`};
	${({ gridRowStart }) =>
		gridRowStart &&
		css`
			grid-row-start: ${gridRowStart};
		`};
	${({ gridRowEnd }) =>
		gridRowEnd &&
		css`
			grid-row-end: ${gridRowEnd};
		`};
	${({ gridColumnStart }) =>
		gridColumnStart &&
		css`
			grid-column-start: ${gridColumnStart};
		`};
	${({ gridColumnEnd }) =>
		gridColumnEnd &&
		css`
			grid-column-end: ${gridColumnEnd};
		`};
	${({ justifyItems }) =>
		justifyItems &&
		css`
			justify-items: ${justifyItems};
		`};
	${({ alignContent }) =>
		alignContent &&
		css`
			align-content: ${alignContent};
		`};
	${({ justifySelf }) =>
		justifySelf &&
		css`
			justify-self: ${justifySelf};
		`};
	${({ alignSelf }) =>
		alignSelf &&
		css`
			align-self: ${alignSelf};
		`};
	${({ gridTemplateAreas }) =>
		gridTemplateAreas &&
		css`
			grid-template-areas: ${gridTemplateAreas};
		`};

	@media (min-width: 480px) {
		grid-template-columns: repeat(${({ xs }) => xs}, 1fr);
	}

	@media (min-width: 768px) {
		grid-template-columns: repeat(${({ sm }) => sm}, 1fr);
	}
	@media (min-width: 1024px) {
		grid-template-columns: repeat(${({ md }) => md}, 1fr);
	}
	@media (min-width: 1280px) {
		grid-template-columns: repeat(${({ lg }) => lg}, 1fr);
	}
	@media (min-width: 1440px) {
		grid-template-columns: repeat(${({ xl }) => xl}, 1fr);
	}
`;

export const StyledGridItem = styled.div<GridItemProps>`
	${({ colStart, colEnd }) =>
		colStart &&
		colEnd &&
		css`
			grid-column: ${colStart} / ${colEnd};
		`}
	${({ rowStart, rowEnd }) =>
		rowStart &&
		rowEnd &&
		css`
			grid-row: ${rowStart} / ${rowEnd};
		`}
`;
