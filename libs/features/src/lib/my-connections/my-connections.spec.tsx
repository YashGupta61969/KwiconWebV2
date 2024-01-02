import { render } from '@testing-library/react';

import MyConnections from './my-connections';

describe('MyConnections', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<MyConnections />);
		expect(baseElement).toBeTruthy();
	});
});
