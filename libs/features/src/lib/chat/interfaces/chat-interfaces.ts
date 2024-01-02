export interface IChat {
	id: string;
	unread: boolean;
	thread: string;
	createdAt: string;
	updatedAt: string;
	message: string;
	azureMessageId: string;
	azureThreadId: string;
	parentMessage: IChat;
	sentTo: number;
	sentBy: string;
	type: string;
	multimedia:string;
}
 export interface thread {
	id:string;
	threadId:string;
	participants:Array<any>;
	createdAt:Date;
	updatedAt:Date;
    unreadMessages: number;
    lastMessage:string;
    lastMessageSentBy:string;
    lastMessageSentDate:string
 }