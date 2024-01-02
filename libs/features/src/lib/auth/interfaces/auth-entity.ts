/*
 * interface for the 'auth' data used in
 */

export interface UserEntity {
	socialIntegration: {
		linkedIn: boolean | null;
	};
	profile: {
		ambitions: [] | null;
	};
	role: string | null;
	isAccountCompleted: false | null;
	education: [] | null;
	specialization: [] | null;
	interests: [] | null;
	expertise: [] | null;
	recognitions: [] | null;
	programs: [] | null;
	experience: [] | null;
	connection: [] | null;
	email: string | null;
	community: [] | null;
	summerprogram: [] | null;
	id: string | null;
}

export interface TokenEntity {
	access: {
		token: string;
		expires: string;
	};
	refresh: {
		token: string;
		expires: string;
	};
}

export interface AuthEntity {
	message: string;
	user: UserEntity | null | unknown;
	tokens: TokenEntity;
}
