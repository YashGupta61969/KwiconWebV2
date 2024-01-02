import { render } from '@testing-library/react';

import AdvisorCard from './advisor-card';

describe('AdvisorCard', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<AdvisorCard />);
		expect(baseElement).toBeTruthy();
	});
});
