import { render } from '@testing-library/react';

import YearPicker from './year-picker';

describe('YearPicker', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<YearPicker />);
		expect(baseElement).toBeTruthy();
	});
});
