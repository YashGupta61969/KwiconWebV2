import { render } from '@testing-library/react';

import ProfilePictureEditor from './profile-picture-editor';

describe('ProfilePictureEditor', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<ProfilePictureEditor />);
		expect(baseElement).toBeTruthy();
	});
});
