import { render } from '@testing-library/react';

import MyPosts from './my-posts';

describe('MyPosts', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<MyPosts />);
		expect(baseElement).toBeTruthy();
	});
});
