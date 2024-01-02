import { render } from '@testing-library/react';

import TabBar from './tab-bar';

describe('TabBar', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<TabBar />);
		expect(baseElement).toBeTruthy();
	});
});
