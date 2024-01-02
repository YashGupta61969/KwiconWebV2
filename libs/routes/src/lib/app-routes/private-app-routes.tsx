import { Protected, lazyImport, routePaths } from '@kwicon/commons';
import { withSuspense } from '@kwicon/components';

// Lazy loaded component

// Home
const { AppHome } = lazyImport(() => import('@kwicon/features'), 'AppHome');
// View Post
const { ViewPost } = lazyImport(() => import('@kwicon/features'), 'ViewPost');

// My Posts
const { MyPosts } = lazyImport(() => import('@kwicon/features'), 'MyPosts');

// Onboarding
const { Onboarding } = lazyImport(
	() => import('@kwicon/features'),
	'Onboarding',
);
const { OnboardingSelectRole } = lazyImport(
	() => import('@kwicon/features'),
	'OnboardingSelectRole',
);
const { OnboardingProfileSummary } = lazyImport(
	() => import('@kwicon/features'),
	'OnboardingProfileSummary',
);

// Other User Profiles
const { OtherUserProfile } = lazyImport(
	() => import('@kwicon/features'),
	'OtherUserProfile',
);

// My Connections
const { MyConnections } = lazyImport(
	() => import('@kwicon/features'),
	'MyConnections',
);
const { MyInvitation } = lazyImport(
	() => import('@kwicon/features'),
	'MyInvitation',
);

// User Profiles
const { UserProfile } = lazyImport(
	() => import('@kwicon/features'),
	'UserProfile',
);
const { UserEditProfile } = lazyImport(
	() => import('@kwicon/features'),
	'UserEditProfile',
);
const { UserAboutMe } = lazyImport(
	() => import('@kwicon/features'),
	'UserAboutMe',
);

const { UserInterests } = lazyImport(
	() => import('@kwicon/features'),
	'UserInterests',
);

const { UserExpertise } = lazyImport(
	() => import('@kwicon/features'),
	'UserExpertise',
);

const { UserExperiences } = lazyImport(
	() => import('@kwicon/features'),
	'UserExperiences',
);

const { AddExperience } = lazyImport(
	() => import('@kwicon/features'),
	'AddExperience',
);
const { UpdateExperience } = lazyImport(
	() => import('@kwicon/features'),
	'UpdateExperience',
);

const { UserEducations } = lazyImport(
	() => import('@kwicon/features'),
	'UserEducations',
);
const { AddEducation } = lazyImport(
	() => import('@kwicon/features'),
	'AddEducation',
);
const { UpdateEducation } = lazyImport(
	() => import('@kwicon/features'),
	'UpdateEducation',
);

const { UserAchievement } = lazyImport(
	() => import('@kwicon/features'),
	'UserAchievement',
);
const { AddAchievement } = lazyImport(
	() => import('@kwicon/features'),
	'AddAchievement',
);
const { UpdateAchievement } = lazyImport(
	() => import('@kwicon/features'),
	'UpdateAchievement',
);
const { UserCertificates } = lazyImport(
	() => import('@kwicon/features'),
	'UserCertificates',
);
const { AddCertificate } = lazyImport(
	() => import('@kwicon/features'),
	'AddCertificate',
);

const { UpdateCertificate } = lazyImport(
	() => import('@kwicon/features'),
	'UpdateCertificate',
);

// chat
const { Chat } = lazyImport(() => import('@kwicon/features'), 'Chat');
const { UserPublicProfile } = lazyImport(
	() => import('@kwicon/features'),
	'UserPublicProfile',
);

const { UserPublicEducations } = lazyImport(
	() => import('@kwicon/features'),
	'UserPublicEducations',
);
const { UserPublicExperiences } = lazyImport(
	() => import('@kwicon/features'),
	'UserPublicExperiences',
);
const { UserPublicAchievements } = lazyImport(
	() => import('@kwicon/features'),
	'UserPublicAchievements',
);
const { UserPublicCertificates } = lazyImport(
	() => import('@kwicon/features'),
	'UserPublicCertificates',
);

// Universal Search
const { SearchResults } = lazyImport(
	() => import('@kwicon/features'),
	'SearchResults',
);

// Account Settings
const { Settings } = lazyImport(() => import('@kwicon/features'), 'Settings');

// with Suspense components
const AppHomeWithSuspense = withSuspense(AppHome);

const ViewPostWithSuspense = withSuspense(ViewPost);

const MyPostsWithSuspense = withSuspense(MyPosts);

const OnBoardingWithSuspense = withSuspense(Onboarding);
const OnBoardingSelectRoleWithSuspense = withSuspense(OnboardingSelectRole);
const OnBoardingProfileSummaryWithSuspense = withSuspense(
	OnboardingProfileSummary,
);
const UserProfileWithSuspense = withSuspense(UserProfile);
const UserEditProfileWithSuspense = withSuspense(UserEditProfile);
const UserAboutMeWithSuspense = withSuspense(UserAboutMe);
const UserInterestsWithSuspense = withSuspense(UserInterests);
const UserExpertiseWithSuspense = withSuspense(UserExpertise);
const UserExperiencesWithSuspense = withSuspense(UserExperiences);
const AddExperienceWithSuspense = withSuspense(AddExperience);
const UpdateExperienceWithSuspense = withSuspense(UpdateExperience);
const UserEducationseWithSuspense = withSuspense(UserEducations);
const AddEducationWithSuspense = withSuspense(AddEducation);
const UpdateEducationWithSuspense = withSuspense(UpdateEducation);
const UserAchievementWithSuspense = withSuspense(UserAchievement);
const AddAchievementWithSuspense = withSuspense(AddAchievement);
const UpdateAchievementWithSuspense = withSuspense(UpdateAchievement);
const UserCertificatesWithSuspense = withSuspense(UserCertificates);
const AddCertificateWithSuspense = withSuspense(AddCertificate);
const UpdateCertificateWithSuspense = withSuspense(UpdateCertificate);
const ChatWithSuspense = withSuspense(Chat);
const UserPublicProfileWithSuspense = withSuspense(UserPublicProfile);
const UserPublicEducationsWithSuspense = withSuspense(UserPublicEducations);
const UserPublicExperiencesWithSuspense = withSuspense(UserPublicExperiences);
const UserPublicAchievementWithSuspense = withSuspense(UserPublicAchievements);
const UserPublicCertificatesWithSuspense = withSuspense(UserPublicCertificates);
const SearchResultsWithSuspense = withSuspense(SearchResults);
const OtherUserProfileWithSuspense = withSuspense(OtherUserProfile);
const MyConnectionsWithSuspense = withSuspense(MyConnections);
const MyInvitationWithSuspense = withSuspense(MyInvitation);
const SettingsWithSuspense = withSuspense(Settings);

export const privateRoutes = {
	home: {
		path: routePaths.root.home,
		element: <Protected element={<AppHomeWithSuspense />} />,

		search: {
			path: `${routePaths.root.search}`,
			element: <Protected element={<SearchResultsWithSuspense />} />,
		},
	},
	post: {
		singlePost: {
			path: `${routePaths.posts.singlePost}`,
			element: <Protected element={<ViewPostWithSuspense />} />,
		},
		myPosts: {
			path: `${routePaths.posts.myPosts}`,
			element: <Protected element={<MyPostsWithSuspense />} />,
		},
	},
	onboarding: {
		path: `${routePaths.onboarding.root}`,
		element: <Protected element={<OnBoardingWithSuspense />} />,
		selectRole: {
			path: `${routePaths.onboarding.selectRole}`,
			element: <Protected element={<OnBoardingSelectRoleWithSuspense />} />,
		},
		profileSummary: {
			path: `${routePaths.onboarding.summary}`,
			element: <Protected element={<OnBoardingProfileSummaryWithSuspense />} />,
		},
	},
	changeRole: {
		path: `${routePaths.changeRole.root}`,
		element: <Protected element={<OnBoardingWithSuspense />} />,
		selectRole: {
			path: `${routePaths.changeRole.selectRole}`,
			element: <Protected element={<OnBoardingSelectRoleWithSuspense />} />,
		},
		profileSummary: {
			path: `${routePaths.changeRole.summary}`,
			element: <Protected element={<OnBoardingProfileSummaryWithSuspense />} />,
		},
	},
	user: {
		path: `${routePaths.user.root}`,
		element: <Protected element={<UserProfileWithSuspense />} />,
		edit: {
			path: `${routePaths.user.edit}`,
			element: <Protected element={<UserEditProfileWithSuspense />} />,
		},
		aboutMe: {
			path: `${routePaths.user.aboutMe}`,
			element: <Protected element={<UserAboutMeWithSuspense />} />,
		},
		interests: {
			path: `${routePaths.user.interests}`,
			element: <Protected element={<UserInterestsWithSuspense />} />,
		},
		expertise: {
			path: `${routePaths.user.expertise}`,
			element: <Protected element={<UserExpertiseWithSuspense />} />,
		},
		experiences: {
			path: `${routePaths.user.experiences.root}`,
			element: <Protected element={<UserExperiencesWithSuspense />} />,
		},
		addExperience: {
			path: `${routePaths.user.experiences.addExperience}`,
			element: <Protected element={<AddExperienceWithSuspense />} />,
		},
		updateExperience: {
			path: `${routePaths.user.experiences.updateExperience}/:id`,
			element: <Protected element={<UpdateExperienceWithSuspense />} />,
		},
		educations: {
			path: `${routePaths.user.education.root}`,
			element: <Protected element={<UserEducationseWithSuspense />} />,
		},
		addEducation: {
			path: `${routePaths.user.education.addEducation}`,
			element: <Protected element={<AddEducationWithSuspense />} />,
		},
		updateEducation: {
			path: `${routePaths.user.education.updateEducation}/:id`,
			element: <Protected element={<UpdateEducationWithSuspense />} />,
		},
		achievements: {
			path: `${routePaths.user.achievement.root}`,
			element: <Protected element={<UserAchievementWithSuspense />} />,
		},
		addAchievement: {
			path: `${routePaths.user.achievement.addAchievement}`,
			element: <Protected element={<AddAchievementWithSuspense />} />,
		},
		updateAchievement: {
			path: `${routePaths.user.achievement.updateAchievement}/:id`,
			element: <Protected element={<UpdateAchievementWithSuspense />} />,
		},
		certificates: {
			path: `${routePaths.user.certificate.root}`,
			element: <Protected element={<UserCertificatesWithSuspense />} />,
		},
		addCertificate: {
			path: `${routePaths.user.certificate.addCertificate}`,
			element: <Protected element={<AddCertificateWithSuspense />} />,
		},
		updateCertificate: {
			path: `${routePaths.user.certificate.editCertificate}/:id`,
			element: <Protected element={<UpdateCertificateWithSuspense />} />,
		},
		publicePorfile: {
			path: `${routePaths.user.publicProfile.root}`,
			element: <Protected element={<UserPublicProfileWithSuspense />} />,
		},
		publicEducations: {
			path: `${routePaths.user.publicProfile.educations}`,
			element: <Protected element={<UserPublicEducationsWithSuspense />} />,
		},
		publicExperiences: {
			path: `${routePaths.user.publicProfile.experience}`,
			element: <Protected element={<UserPublicExperiencesWithSuspense />} />,
		},
		publicAchievements: {
			path: `${routePaths.user.publicProfile.achievements}`,
			element: <Protected element={<UserPublicAchievementWithSuspense />} />,
		},
		publicCertificates: {
			path: `${routePaths.user.publicProfile.certificates}`,
			element: <Protected element={<UserPublicCertificatesWithSuspense />} />,
		},
	},
	otherUserProfile: {
		path: `${routePaths.otherUserProfile.root}`,
		element: <Protected element={<OtherUserProfileWithSuspense />} />,
	},
	myConnections: {
		path: `${routePaths.myConnections.root}`,
		element: <Protected element={<MyConnectionsWithSuspense />} />,
	},
	myInvitation: {
		path: `${routePaths.myConnections.invitations}`,
		element: <Protected element={<MyInvitationWithSuspense />} />,
	},
	chat: {
		path: `${routePaths.chat.root}`,
		element: <Protected element={<ChatWithSuspense />} />,
	},
	settings: {
		path: `${routePaths.settings.root}`,
		element: <Protected element={<SettingsWithSuspense />} />,
	},
};
