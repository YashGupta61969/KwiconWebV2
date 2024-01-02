import { render } from '@testing-library/react';

import AppHome from './app-home';

describe('AppHome', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<AppHome />);
		expect(baseElement).toBeTruthy();
	});
});
