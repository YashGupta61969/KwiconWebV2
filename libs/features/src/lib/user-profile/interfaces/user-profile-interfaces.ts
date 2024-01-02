export interface ISkillSet {
	id: string | null | undefined;
	name: string | null | undefined;
	category: string | null | undefined;
	schoolId?: string | null | undefined;
}

export interface IAddress {
	id?: string | null | undefined;
	state: string | null | undefined;
	city: string | null | undefined;
	country: string | null | undefined;
	address: string | null | undefined;
	zipCode: string | null | undefined;
}

export interface UserUpdateForm {
	firstName: string | null | undefined;
	lastName: string | null | undefined;
	email: string | null | undefined;
	birthYear: string | null | undefined;
	phone: {
		countryCode: string | null | undefined;
		phoneNumber: string | null | undefined;
	};
	country: string | null | undefined;
	state: string | null | undefined;
	city: string | null | undefined;
	zipCode: string | null | undefined;
	address: string | null | undefined;
	linkedInURL: string | null | undefined;
}

export interface IExperience {
	id?: string;
	role?: string;
	organization?: string;
	location?: string;
	description?: string;
	isCurrentlyWorking?: boolean;
	startDate?: string;
	endDate?: string;
	skillSet?: ISkillSet[] | null | undefined;
}

export interface IEducation {
	id?: string;
	degree?: string;
	school?: string;
	fieldOfStudy?: string;
	location?: string;
	description?: string;
	isCurrentlyStudying?: boolean;
	startDate?: string;
	endDate?: string;
	skillSet: ISkillSet[] | null | undefined;
}

export interface IAchievement {
	id?: string;
	awardName?: string;
	givenBy?: string;
	description?: string;
	date?: string;
}

export interface ICertificate {
	id?: string;
	title?: string;
	conductedBy?: string;
	location?: string;
	description?: string;
	startDate?: string;
	endDate?: string;
	isCurrentlyPursuing?: boolean;
	skillSet?: ISkillSet[] | null | undefined;
}

export interface IUser {
	id?: string | undefined;
	email?: string | null | undefined;
	name?: string | null | undefined;
	role?: string | null | undefined;
	isAccountCompleted?: boolean | null | undefined;
	azureCommunicationUserId: string | undefined;
	lastStep?: number | null | undefined;
	birthYear?: number | null | undefined;
	deactivateReason?: string | null | undefined;
	schoolId?: string | null | undefined;
	schoolName?: string | null | undefined;
	phone?: {
		countryCode: string | null | undefined;
		phoneNumber: string | null | undefined;
	};
	addressId?: IAddress;
	grade?: string | null | undefined;
	board?: string | null | undefined;
	socialIntegration?: {
		linkedIn: boolean | null | undefined;
		google: boolean | null | undefined;
	};
	isActive?: boolean | null | undefined;
	about?: string | null | undefined;
	linkedInURL?: string | null | undefined;
	cvFile?:
	| {
		userId: string;
		fileName: string;
		fileType: string;
		fileSize: number;
		fileContainer: string;
		filePath: string;
		id: string;
	}
	| null
	| undefined;
	profilePicture?: string | null | undefined;
	profession?: string | null | undefined;
	education?: IEducation[] | null | undefined;
	interests?:
	| {
		id: string;
		name: string;
		category: string;
		schoolId: string;
	}[]
	| null
	| undefined;
	specialization?:
	| {
		id: string;
		name: string;
		category: string;
		schoolId: string;
	}[]
	| null
	| undefined;
	expertise?:
	| {
		id: string;
		name: string;
		category: string;
		schoolId: string;
	}[]
	| null
	| undefined;
	recognitions?: IAchievement[] | null | undefined;
	programs?: ICertificate[] | null | undefined;
	experience?: IExperience[] | null | undefined;
	connections?: {
		seeker: [] | null | undefined;
		advisor: [] | null | undefined;
	};
	community?: any | null | undefined;
}

export interface IMediaState {
	loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
	error: string | null | undefined;
	data: string | undefined;
}

export interface IConnectionsQBUserIds {
	advisor: Array<number>;
	seeker: Array<number>;
}

export interface ICountryCode {
	name: string;
	isocode: string;
	phonecode: string;
}

export interface IUserState {
	id: string;
	loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
	conversationLoadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
	error: string | null | undefined;
	user: IUser;
	media: IMediaState;
	connectionsQBUserIds: IConnectionsQBUserIds;
	publicUser: any;
	connections: any[] | null | undefined;
	countryCodes: {
		loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
		countries: ICountryCode[] | null | undefined;
	};
	userDevices: {
		loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
		devices: any[] | null | undefined;
		error: string | null | undefined;
	};
}

export interface IPayload {
	[key: string]:
	| string
	| string[]
	| boolean
	| number
	| number[]
	| undefined
	| null
	| {
		[key: string]:
		| string
		| string[]
		| boolean
		| number
		| number[]
		| undefined
		| null;
	};
}
