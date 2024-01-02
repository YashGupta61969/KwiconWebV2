import { render } from '@testing-library/react';

import CommunityCard from './community-card';

describe('CommunityCard', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<CommunityCard />);
		expect(baseElement).toBeTruthy();
	});
});
