import { AuthEntity } from './auth-entity';

export interface AuthState {
	loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
	otpLoadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
	socialLoadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
	error: string | null | undefined;
	otpError: string | null | undefined;
	data: AuthEntity | null;
}
