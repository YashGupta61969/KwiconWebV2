import { render } from '@testing-library/react';

import CheckBox from './check-box';

describe('CheckBox', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<CheckBox />);
		expect(baseElement).toBeTruthy();
	});
});
