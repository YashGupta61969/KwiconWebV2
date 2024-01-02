import { UserRole } from '../types/onboarding-types';

export interface OnboardingUserEntity {
	lastStep?: number;
	isAccountCompleted?: boolean;
	role?: UserRole;
	name?: string;
	firstName?: string | null;
	lastName?: string | null;
	email?: string | null;
	linkedInURL?: string | null;
	phone?: string | null;
	grade?: string;
	schoolId?: string;
	schoolName?: string | null;
	addressId?: string;
	board?: string;
	about?: string;
	isActive?: boolean;
	profilePicture?: string | undefined;
	profession?: string | null;
	interests?: string[];
	specialization?: string[];
	expertise?: string[];
	connection?: string[];
	community?: string[];
	cvFile?: string | null | undefined;
}

export interface OnboardingCommunityEntity {
	id: string | null | undefined;
	name: string | null | undefined;
	description: string | null | undefined;
	leader: {
		name: string | null | undefined;
	};
	schoolId: string | null | undefined;
	admins: [] | null | undefined;
	communityAdvisors: [] | null | undefined;
	members: [] | null | undefined;
	requests: [] | null | undefined;
	message: string | null | undefined;
}

export interface OnboardingState {
	loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
	error: string | null | undefined;
	data: OnboardingUserEntity | null;
	onboardingUserData: OnboardingUserEntity;
	selectedOnboardingCategories: string[];
	subCategoryList:
		| {
				id: string;
				name: string;
				category: string;
		  }[]
		| null
		| undefined;
	onboardingCategories: {
		categoryList: string[] | null | undefined;
	};
	selectedSubCategoryIds: string[] | null | undefined;
	advisors:
		| {
				name: string;
				id: string;
				profilePicture: string;
				profession: string;
				specialization:
					| {
							id: string;
							name: string;
							category: string;
					  }[]
					| null
					| undefined;
		  }[]
		| null
		| undefined;
	communities: OnboardingCommunityEntity[] | null | undefined;
	user: null | undefined | any;
	allGrades:
		| {
				values: string[] | null | undefined;
				name: string;
				type: string;
				createdAt: string;
				updatedAt: string;
				id: string;
		  }[]
		| null
		| undefined;
}

export interface UserDataEntry extends OnboardingUserEntity {
	firstName: string | null;
	lastName: string | null;
	profession: string | null;
	alumniOf: string | null;
	email?: string | null;
	linkedInUrl: string | null;
	phoneNumber: string | null;
	cvFile: string | null;
}
