import { render } from '@testing-library/react';

import SidebarDrawer from './sidebar-drawer';

describe('SidebarDrawer', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<SidebarDrawer />);
		expect(baseElement).toBeTruthy();
	});
});
