export const routePathsWeb = {
	root: {
		home: '/home',
		team: '/team',
		about: '/about',
		contact: '/contact',
		advisory: '/advisory',
		privacyPolicy: '/privacy-policy',
		termsOfUse: '/terms-of-use',
		pricing: '/pricing',
	},
};

export const routePaths = {
	root: {
		home: '/',
		search: '/search-results',
	},
	auth: {
		login: '/login',
	},
	onboarding: {
		root: '/onboarding',
		selectRole: '/onboarding/select-role',
		summary: '/onboarding/summary',
	},
	chat: {
		root: '/chat',
	},
	communities: {
		root: '/communities',
	},
	posts: {
		root: '/posts',
		singlePost: '/posts/:postId',
		myPosts: '/posts/my-posts',
	},
	user: {
		root: '/user',
		edit: '/user/edit',
		aboutMe: '/user/about-me',
		interests: '/user/interests',
		expertise: '/user/expertise',
		experiences: {
			root: '/user/my-experience',
			addExperience: '/user/my-experience/add-experience',
			updateExperience: '/user/my-experience/edit-experience',
		},
		education: {
			root: '/user/my-education',
			addEducation: '/user/my-education/add-education',
			updateEducation: '/user/my-education/edit-education',
		},
		achievement: {
			root: '/user/my-achievement',
			addAchievement: '/user/my-achievement/add-achievement',
			updateAchievement: '/user/my-achievement/edit-achievement',
		},
		certificate: {
			root: '/user/my-certificate',
			addCertificate: '/user/my-certificate/add-certificate',
			editCertificate: '/user/my-certificate/edit-certificate',
		},
		publicProfile: {
			root: '/user/public-profile',
			experience: '/user/public-profile/experiences',
			educations: '/user/public-profile/educations',
			achievements: '/user/public-profile/achievements',
			certificates: '/user/public-profile/certificates',
		},
	},
	otherUserProfile: {
		root: '/profile/:id',
	},
	myConnections: {
		root: '/my-connections',
		invitations: '/my-connections/invitations',
	},
	settings: {
		root: '/account-settings',
	},

	common: {
		communityGuidelines: '/community-guidelines',
	},

	changeRole: {
		root: '/change-role',
		selectRole: '/change-role/select-role',
		summary: '/change-role/summary',
	},

	webRoutes: routePathsWeb,
};

export default routePaths;
