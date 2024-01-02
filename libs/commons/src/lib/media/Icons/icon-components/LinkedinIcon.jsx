import * as React from 'react';
const SvgLinkedinIcon = props => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={21}
		height={20}
		fill="none"
		{...props}
	>
		<g clipPath="url(#linkedin-icon_svg__a)">
			<path
				fill="#0A66C1"
				d="M17.54 17.041h-2.962v-4.64c0-1.107-.02-2.532-1.542-2.532-1.543 0-1.78 1.206-1.78 2.45v4.722H8.294V7.497h2.845v1.305h.04a3.117 3.117 0 0 1 2.807-1.542c3.003 0 3.557 1.976 3.557 4.546l-.001 5.235ZM4.95 6.193a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44ZM6.43 17.04H3.465V7.497H6.43v9.544ZM19.018.001H1.976A1.46 1.46 0 0 0 .5 1.443v17.114A1.46 1.46 0 0 0 1.976 20h17.042c.808.01 1.47-.636 1.482-1.443V1.442A1.463 1.463 0 0 0 19.018 0"
			/>
		</g>
		<defs>
			<clipPath id="linkedin-icon_svg__a">
				<path fill="#fff" d="M.5 0h20v20H.5z" />
			</clipPath>
		</defs>
	</svg>
);
export default SvgLinkedinIcon;
