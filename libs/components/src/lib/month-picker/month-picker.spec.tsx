import { render } from '@testing-library/react';

import MonthPicker from './month-picker';

describe('MonthPicker', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<MonthPicker />);
		expect(baseElement).toBeTruthy();
	});
});
