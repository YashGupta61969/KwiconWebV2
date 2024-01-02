import { render } from '@testing-library/react';

import CommunitySearch from './community-search';

describe('CommunitySearch', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<CommunitySearch />);
		expect(baseElement).toBeTruthy();
	});
});
