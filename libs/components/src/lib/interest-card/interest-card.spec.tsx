import { render } from '@testing-library/react';

import InterestCard from './interest-card';

describe('InterestCard', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<InterestCard />);
		expect(baseElement).toBeTruthy();
	});
});
