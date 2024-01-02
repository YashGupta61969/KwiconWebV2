import {} from 'styled-components';
import { CSSProp, StyledProps } from 'styled-components';

import { KwiconTheme as theme } from './libs/kwicon-ui/src/lib/kwicon-theme/kwicon-theme';

declare module 'styled-components' {
	type Theme = typeof theme;

	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface DefaultTheme extends Theme {}
}

declare module 'react' {
	interface Attributes {
		css?: CSSProp<Theme> | CSSObject;
		style?: StyledProps<Theme>['style'];
	}
}
