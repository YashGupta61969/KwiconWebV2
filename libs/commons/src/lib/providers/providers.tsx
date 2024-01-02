import { Store } from '@reduxjs/toolkit';
import { Provider as ReduxProvider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
import envKeys from '../constants/env-keys';

export interface ProvidersProps {
	children: React.ReactNode;
	store: Store;
}

export function Provider({ store, children }: ProvidersProps) {
	return (
		<ReduxProvider store={store}>
			<Auth0Provider
				clientId={envKeys.AUTH0_CLIENT_ID as string}
				domain={envKeys.AUTH0_DOMAIN as string}
				authorizationParams={{
					scope: 'openid profile email',
					connection: 'google-oauth2',
					redirect_uri: window.location.origin,
				}}
			>
				<BrowserRouter>{children}</BrowserRouter>
			</Auth0Provider>
		</ReduxProvider>
	);
}

export default Provider;
