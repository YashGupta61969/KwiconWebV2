import React from 'react';
import { ThemeProvider } from 'styled-components';
import { KwiconTheme as theme } from '../src';

export const ThemeDecorator = (storyFunction: () => React.ReactNode) => (
	<ThemeProvider theme={theme}>{storyFunction()}</ThemeProvider>
);

export default ThemeDecorator;
