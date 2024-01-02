import { ThemeProvider } from 'styled-components';
import { IKwiconTheme } from './theme-interfaces';

/* eslint-disable-next-line */
export interface KwiconThemeProviderProps {
	theme: IKwiconTheme;
	children: React.ReactNode;
}

/**
 ** KwiconThemeProvider
 * @returns JSX.Element {React.FC<KwiconThemeProviderProps>}
 */
export const KwiconThemeProvider: React.FC<KwiconThemeProviderProps> = ({
	children,
	theme,
}) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default KwiconThemeProvider;
