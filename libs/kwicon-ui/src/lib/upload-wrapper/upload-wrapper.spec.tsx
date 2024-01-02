import { render } from '@testing-library/react';

import UploadWrapper from './upload-wrapper';

describe('UploadWrapper', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<UploadWrapper />);
		expect(baseElement).toBeTruthy();
	});
});
