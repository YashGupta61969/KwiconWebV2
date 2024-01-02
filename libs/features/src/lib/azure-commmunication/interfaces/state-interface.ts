import { IChat, thread } from "../../chat/interfaces/chat-interfaces";
import { IUser } from "../../user-profile/interfaces/user-profile-interfaces";

export interface AzureState {
	loadingStatus: string,
	error: string | undefined,
	otherUser: IUser | {},
	parentMessage: IChat | undefined,
	currentChat: IChat[] | [],
	currentThread: thread | undefined,
	allThreads: thread[] | [],
	totalPages: number,
	currentPage: number,
	Limit: number,
	tempMessage: {}
}
