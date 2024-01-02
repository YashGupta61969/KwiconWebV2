import { render } from '@testing-library/react';

import Tracker from './tracker';

describe('Tracker', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<Tracker />);
		expect(baseElement).toBeTruthy();
	});
});
