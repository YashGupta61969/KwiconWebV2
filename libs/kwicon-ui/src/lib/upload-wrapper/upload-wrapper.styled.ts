import styled from 'styled-components';

export const StyledUploadWrapper = styled.div`
	position: relative;
	overflow: hidden;
	display: inline-block;

	cursor: pointer;

	input[type='file'] {
		font-size: 1rem;
		position: absolute;
		left: 0;
		top: 0;
		opacity: 0;
	}
`;
