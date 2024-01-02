export const endpoints = {
	authentication: {
		getLoginOTP: '/auth/get-login-otp',
		verifyLoginOTP: '/auth/verify-login-otp',
		socialLogin: '/auth/social-login',
	},
	socialFeedPost: {
		searchPosts: '/social-feed/post/search-posts',
		handleSocialFeedPostUpvote:
			'/social-feed/post/handle-social-feed-post-upvote',
		getSocialFeedPostById: '/social-feed/post/get-social-feed-post',
		getSocialFeedPostByUserId: '/social-feed/post/get-all-social-feed-posts',
		addSocialFeedPost: '/social-feed/post/add-social-feed-post',
		updateSocialFeedPost: '/social-feed/post/update-social-feed-post',
		getAllSocialFeedPosts: '/social-feed/post/get-all-social-feed-posts',
		deleteSocialFeedPost: '/social-feed/post/delete-social-feed-post',
	},
	socialFeedPostComment: {
		addComment: '/social-feed/post-comments/add-comment',
		getComments: '/social-feed/post-comments/get-comments',
		handleCommentUpvote: '/social-feed/post-comments/handle-comment-upvote',
		deleteComment: '/social-feed/post-comments/delete-comment',
	},
	user: {
		getUser: '/users/get-user',
		getPublicUser: '/users/get-public-user',
		updateUser: '/users/update-user',
		updateProfileFields: '/users/update-profile-fields',
		getAllAdvisors: '/users/all-advisors',
		getAdvisorsByCategoryId: '/users/get-advisors-by-category-id',
		unfollowUser: '/users/unfollow-user',
		getAllConnections: '/users/get-connections',
		deactivateAccount: '/users/deactivate-account',
		getUserByQbId: '/users/get-user',
	},
	address: {
		addAddress: '/user-address/add-user-address',
		updateAddress: '/user-address/update-user-address',
	},
	experience: {
		addExperience: '/experience/add-experience',
		deleteExperience: '/experience/delete-experience',
		updateExperience: '/experience/update-experience',
	},
	education: {
		addEducation: '/education/add-education',
		updateEducation: '/education/update-education',
		deleteEducation: '/education/delete-education',
	},
	achievement: {
		addAchievement: '/recognition/add-recognition',
		updateAchievement: '/recognition/update-recognition',
		deleteAchievement: '/recognition/delete-recognition',
	},
	certificate: {
		addCertificate: '/program/add-program',
		updateCertificate: '/program/update-program',
		deleteCertificate: '/program/delete-program',
	},
	media: {
		getMedia: '/media/get-media',
		addMedia: '/media/add-media',
		updateProfilePicture: '/media/update-profile-picture',
		deleteProfilePicture: '/media/delete-profile-picture',
		updateProfileCV: '/media/update-profile-cv',
		deleteProfileCV: '/media/delete-profile-cv',
	},
	field: {
		getAllCategories: '/fields/get-all-categories',
		getSubCategoriesByCategories: '/fields/get-all-subcategories-by-categories',
		addCategory: '/fields/add-category',
	},
	community: {
		getAllCommunities: '/community/get-all-communities',
		joinOrWithdrawCommunity: '/community/join-or-withdraw-community',
	},
	supportData: {
		getAllSupportData: '/support-data/get-all-support-data',
		getAllCountries: '/support-data/get-dropdown-country',
	},
	search: {
		searchAdvisors: '/users/search-advisors',
	},
	connectionRequest: {
		sendOrWithdrawConnectionRequest:
			'/connection-request/send-or-withdraw-connection-request',
		getAllConnectionRequests: '/connection-request/get-all-connection-requests',
		acceptOrRejectConnectionRequest:
			'/connection-request/accept-or-reject-connection-request',
	},
	devices: {
		addDevice: '/user-devices/add-user-device',
		getDevices: '/user-devices/get-user-device',
		updateDevice: '/user-devices/update-user-device',
	},
	chat: {
		createChat : '/chats/azure/create-thread',
		getChats: '/chats/azure/get-threads',
		retrieveMEssages: '/chats/azure/retreive-messages',
		sendMessage: '/chats/azure/send-message',
		deleteMessage: '/chats/azure/delete-message',
	}
};

export default endpoints;
