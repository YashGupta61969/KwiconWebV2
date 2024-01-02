import * as React from 'react';
const SvgBlob = props => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={props.width}
		height={props.height}
		fill={props.fill}
		{...props}
	>
		<path
			fill={props.pathFill}
			d="M44.652 14.324c3.556 5.18 4.228 11.9 3.024 18.592-1.204 6.72-4.284 13.412-9.604 16.296-5.32 2.856-12.852 1.904-19.096-1.288-6.272-3.192-11.228-8.596-12.74-14.868-1.484-6.3.448-13.468 4.704-18.788 4.256-5.32 10.808-8.82 17.276-8.764 6.496.056 12.908 3.668 16.436 8.82Z"
		/>
	</svg>
);
export default SvgBlob;
