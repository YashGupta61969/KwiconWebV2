import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from '@kwicon/commons';
import { store } from '@kwicon/features';

import App from './app/app';
import './styles.css';
import { KwiconTheme, KwiconThemeProvider } from '@kwicon/kwicon-ui';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);
root.render(
	<StrictMode>
		<KwiconThemeProvider theme={KwiconTheme}>
			<Provider store={store}>
				<App />
			</Provider>
		</KwiconThemeProvider>
	</StrictMode>,
);
