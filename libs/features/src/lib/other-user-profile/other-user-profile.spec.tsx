import { render } from '@testing-library/react';

import OtherUserProfile from './other-user-profile';

describe('OtherUserProfile', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<OtherUserProfile />);
		expect(baseElement).toBeTruthy();
	});
});
