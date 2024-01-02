/* eslint-disable @typescript-eslint/no-explicit-any */
//* Note: Using any for the props as the typings for the react-slider are not working properly

import ReactSlider from 'react-slider';
import styled from 'styled-components';
export const StyledSlider = styled(ReactSlider)`
	width: 100%;
	height: 10px;
`;

export const StyledTrack = styled.div`
	top: 0;
	bottom: 0;
	background: ${(props: any) =>
		props.index === 0
			? props.theme.palettes.colors.secondary
			: props.theme.palettes.colors.lightBlue[2]};

	/* TODO: Have to fix the border radius */
	border-radius: ${(props: any) =>
		props.index === 0 ? '999px 0 0 999px' : '0 999px 999px 0'};
`;
