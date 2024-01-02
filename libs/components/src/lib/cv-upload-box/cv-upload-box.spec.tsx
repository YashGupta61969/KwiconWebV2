import { render } from '@testing-library/react';

import CvUploadBox from './cv-upload-box';

describe('CvUploadBox', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<CvUploadBox />);
		expect(baseElement).toBeTruthy();
	});
});
