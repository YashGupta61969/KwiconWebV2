import { render } from '@testing-library/react';

import PaginationFooter from './pagination-footer';

describe('paginationFooter', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<PaginationFooter />);
		expect(baseElement).toBeTruthy();
	});
});
